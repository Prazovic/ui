import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button, Col, Menu, Popover, Row, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import styled from 'styled-components';
import { useWallet } from '../utils/wallet';
import { ENDPOINTS, useConnectionConfig } from '../utils/connection';
import Settings from './Settings';
import CustomClusterEndpointDialog from './CustomClusterEndpointDialog';
import { EndpointInfo } from '../utils/types';
import { notify } from '../utils/notifications';
import { Connection } from '@solana/web3.js';
import WalletConnect from './WalletConnect';
import AppSearch from './AppSearch';
import { getTradePageUrl } from '../utils/markets';






const Wrapper = styled.div`
  background-color: #090909;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 30px;
  flex-wrap: wrap;
  
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #f9f7fa;
  font-weight: bold;
  cursor: pointer;
  img {
    height: 50px;
    margin-right: 4px;
  }
  
`;

const EXTERNAL_LINKS = {
  '/learn': 'https://docs.projectserum.com/trade-on-serum-dex/trade-on-serum-dex-1',
  '/add-market': 'https://serum-academy.com/en/add-market/',
  '/wallet-support': 'https://baliarena.com/brea/wallet.html',
  '/dex-list': 'https://serum-academy.com/en/dex-list/',
  '/developer-resources': 'https://serum-academy.com/en/developer-resources/',
  '/explorer': 'https://solscan.io',
  '/srm-faq': 'https://projectserum.com/srm-faq',
  '/swap': 'https://swap.projectserum.com',
  '/docs': 'https://docs.baliarena.com/guides/dex-arena',

};



export default function TopBar() {
  const { connected, wallet } = useWallet();
  const {
    endpoint,
    endpointInfo,
    setEndpoint,
    availableEndpoints,
    setCustomEndpoints,
  } = useConnectionConfig();
  const [addEndpointVisible, setAddEndpointVisible] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const [searchFocussed, setSearchFocussed] = useState(false);

  const handleClick = useCallback(
    (e) => {
      if (!(e.key in EXTERNAL_LINKS)) {
        history.push(e.key);
      }
    },
    [history],
  );

  const onAddCustomEndpoint = (info: EndpointInfo) => {
    const existingEndpoint = availableEndpoints.some(
      (e) => e.endpoint === info.endpoint,
    );
    if (existingEndpoint) {
      notify({
        message: `An endpoint with the given url already exists`,
        type: 'error',
      });
      return;
    }

    const handleError = (e) => {
      console.log(`Connection to ${info.endpoint} failed: ${e}`);
      notify({
        message: `Failed to connect to ${info.endpoint}`,
        type: 'error',
      });
    };

    try {
      const connection = new Connection(info.endpoint, 'recent');
      connection
        .getBlockTime(0)
        .then(() => {
          setTestingConnection(true);
          console.log(`testing connection to ${info.endpoint}`);
          const newCustomEndpoints = [
            ...availableEndpoints.filter((e) => e.custom),
            info,
          ];
          setEndpoint(info.endpoint);
          setCustomEndpoints(newCustomEndpoints);
        })
        .catch(handleError);
    } catch (e) {
      handleError(e);
    } finally {
      setTestingConnection(false);
    }
  };

  const endpointInfoCustom = endpointInfo && endpointInfo.custom;
  useEffect(() => {
    const handler = () => {
      if (endpointInfoCustom) {
        setEndpoint(ENDPOINTS[0].endpoint);
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [endpointInfoCustom, setEndpoint]);

  const tradePageUrl = location.pathname.startsWith('/market/')
    ? location.pathname
    : getTradePageUrl();


    const menuStyle = {
      margin: '0 10px 0 20px', 
      color: '#B026FF',
      fontSize:'16px',
      fontWeight: 600,
 
     };


  return (
    <>
      <CustomClusterEndpointDialog
        visible={addEndpointVisible}
        testingConnection={testingConnection}
        onAddCustomEndpoint={onAddCustomEndpoint}
        onClose={() => setAddEndpointVisible(false)}
      />
      <Wrapper>
        <LogoWrapper onClick={() => history.push(tradePageUrl)}>
          <img src={logo} alt="" />
          {''}
        </LogoWrapper>
        <Menu
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[location.pathname]}
          style={{
            borderBottom: 'none',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'flex-end',
            flex: 1,
          }}
        >
          <Menu.Item key={tradePageUrl} style={menuStyle}>
            TRADE
          </Menu.Item>
          {connected && (!searchFocussed || location.pathname === '/balances') && (
            <Menu.Item key="/balances" style={{ margin: '0 10px' }}>
              BALANCES
            </Menu.Item>
          )}
          {connected && (!searchFocussed || location.pathname === '/orders') && (
            <Menu.Item key="/orders" style={{ margin: '0 10px' }}>
              ORDERS
            </Menu.Item>
          )}
          {(!searchFocussed || location.pathname === '/list-new-market') && (
            <Menu.Item key="/list-new-market" style={{ margin: '0 10px' }}>
              ADD MARKET
            </Menu.Item>
          )}
{!searchFocussed && (
            <Menu.SubMenu
              title="MORE"
              style={{ margin: '0 0px 0 10px' }}
            >
              <Menu.Item key="/wallet-support">
              <a
                href={EXTERNAL_LINKS['/wallet-support']}
                target="_blank"
                rel="noopener noreferrer"
              >
                GET WALLET
              </a>
            </Menu.Item>
              <Menu.Item key="/explorer">
              <a
                href={EXTERNAL_LINKS['/explorer']}
                target="_blank"
                rel="noopener noreferrer"
              >
                EXPLORER
              </a>
            </Menu.Item>
              <Menu.Item key="/docs">
              <a
                href={EXTERNAL_LINKS['/docs']}
                target="_blank"
                rel="noopener noreferrer"
              >
                HELP
              </a>
            </Menu.Item>
            </Menu.SubMenu>
          )}


        </Menu>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingRight: 5,
          }}
        >
          <AppSearch
            onFocus={() => setSearchFocussed(true)}
            onBlur={() => setSearchFocussed(false)}
            focussed={searchFocussed}
            width={searchFocussed ? '350px' : '35px'}
          />
        </div>
        <div>
          <Row
            align="middle"
            style={{ paddingLeft: 5, paddingRight: 5 }}
            gutter={16}
          >
            <Col>
              <PlusCircleOutlined
                style={{ color: '#f9f7fa' }}
                onClick={() => setAddEndpointVisible(true)}
              />
            </Col>
            <Col>
              <Popover
                content={null}
                placement="bottomRight"
                title="Main Network"
                trigger="hover"
              >
                <InfoCircleOutlined style={{ color: '#f9f7fa' }} />
              </Popover>
            </Col>
            <Col>
              <Select
                onSelect={setEndpoint}
                value={endpoint}
                style={{ marginRight: 8, width: '150px' }}
              >
                {availableEndpoints.map(({ name, endpoint }) => (
                  <Select.Option value={endpoint} key={endpoint}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </Col>
          </Row>
        </div>
        {connected && (
          <div>
            <Popover
              content={<Settings autoApprove={wallet?.autoApprove} />}
              placement="bottomRight"
              title="Settings"
              trigger="click"
            >
              <Button style={{ marginRight: 8}}>
                <SettingOutlined />
                Settings
              </Button>
            </Popover>
          </div>
        )}
        <div  style={{ borderColor:'yellow'}}>
          <WalletConnect/>
        </div>
      </Wrapper>
    </>
  );
}
