import { ReactComponent as KnowledgeBaseIcon } from '@/assets/svg/knowledge-base.svg';
import { ReactComponent as WriteIcon } from '@/assets/svg/write.svg';
import { useTheme } from '@/components/theme-provider';
import { useTranslate } from '@/hooks/common-hooks';
import { useNavigateWithFromState } from '@/hooks/route-hook';
import authorizationUtil from '@/utils/authorization-util';
import { MessageOutlined } from '@ant-design/icons';
import { Divider, Flex, Layout, Radio, theme } from 'antd';
import React, { MouseEventHandler, useCallback, useMemo } from 'react';
import { Outlet, useLocation } from 'umi';
import '../locales/config';
import Header from './components/header';

import styles from './index.less';

const { Content, Sider } = Layout;

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const navigate = useNavigateWithFromState();
  const { pathname } = useLocation();
  const { t } = useTranslate('header');
  const { theme: themeRag } = useTheme();
  const userInfo = authorizationUtil.getUserInfo();

  let tagsData = useMemo(
    () => [
      // { path: '/knowledge', name: t('knowledgeBase'), icon: KnowledgeBaseIcon },
      // { path: '/chat', name: t('chat'), icon: MessageOutlined },
      {
        path: '/taxIncentivesQA',
        name: t('taxIncentivesQA'),
        icon: MessageOutlined,
      },
      {
        path: '/subsidiesQA',
        name: t('specialSubsidiesQA'),
        icon: MessageOutlined,
      },
      {
        path: '/industryRegulations',
        name: t('industryRegulations'),
        icon: MessageOutlined,
      },
      { path: '/write', name: t('write'), icon: WriteIcon },
      // {
      //   path: '/enterpriseDiagnosis',
      //   name: t('enterpriseDiagnosis'),
      //   icon: MessageOutlined,
      // },
    ],
    [t],
  );

  if (userInfo && JSON.parse(userInfo).name === 'admin') {
    tagsData = useMemo(
      () => [
        {
          path: '/knowledge',
          name: t('knowledgeBase'),
          icon: KnowledgeBaseIcon,
        },
        { path: '/chat', name: t('chat'), icon: MessageOutlined },
        {
          path: '/taxIncentivesQA',
          name: t('taxIncentivesQA'),
          icon: MessageOutlined,
        },
        {
          path: '/subsidiesQA',
          name: t('specialSubsidiesQA'),
          icon: MessageOutlined,
        },
        {
          path: '/industryRegulations',
          name: t('industryRegulations'),
          icon: MessageOutlined,
        },
        { path: '/write', name: t('write'), icon: WriteIcon },
        // { path: '/search', name: t('search'), icon: SearchOutlined },
      ],
      [t],
    );
  }

  const currentPath = useMemo(() => {
    return (
      tagsData.find((x) => pathname.startsWith(x.path))?.name || 'knowledge'
    );
  }, [pathname, tagsData]);

  const handleChange = useCallback(
    (path: string): MouseEventHandler =>
      (e) => {
        e.preventDefault();
        navigate(path);
      },
    [navigate],
  );

  return (
    <Layout className={styles.layout}>
      <Layout>
        <Header></Header>
        <Divider orientationMargin={0} className={styles.divider} />
        <Layout style={{ display: 'flex', flexDirection: 'row' }}>
          <Sider
            width={160}
            style={{
              background: colorBgContainer,
              padding: '16px 0',
              borderRight: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
            }}
          >
            <Radio.Group
              defaultValue="a"
              buttonStyle="solid"
              className={
                themeRag === 'dark' ? styles.radioGroupDark : styles.radioGroup
              }
              value={currentPath}
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              {tagsData.map((item, index) => (
                <Radio.Button
                  className={`${themeRag === 'dark' ? 'dark' : 'light'} ${index === 0 ? 'first' : ''} ${index === tagsData.length - 1 ? 'last' : ''}`}
                  value={item.name}
                  key={item.name}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    margin: 0,
                    borderRadius: '4px',
                    padding: '12px 16px',
                    transition:
                      'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), all 0.15s ease, margin-top 0.2s ease',
                    '&.active': {
                      marginTop: '8px',
                      marginBottom: '8px',
                    },
                    border: 'none',
                    background:
                      item.name === currentPath
                        ? 'rgba(24, 144, 255, 0.08)'
                        : 'transparent',
                    '&:hover': {
                      background:
                        item.name === currentPath
                          ? 'rgba(24, 144, 255, 0.12)'
                          : 'rgba(0, 0, 0, 0.02)',
                    },
                  }}
                >
                  <a href={item.path} style={{ textDecoration: 'none' }}>
                    <Flex
                      align="center"
                      gap={10}
                      style={{ marginTop: '-10px' }}
                      onClick={handleChange(item.path)}
                      className="cursor-pointer"
                    >
                      <item.icon
                        className={styles.radioButtonIcon}
                        stroke={
                          item.name === currentPath
                            ? '#1890ff'
                            : 'rgba(0, 0, 0, 0.75)'
                        }
                        style={{ fontSize: '16px', opacity: 0.9 }}
                      />
                      <span
                        style={{
                          fontSize: '14px',
                          fontWeight: item.name === currentPath ? 500 : 400,
                          color:
                            item.name === currentPath
                              ? '#1890ff'
                              : 'rgba(0, 0, 0, 0.75)',
                          letterSpacing: '0.2px',
                        }}
                      >
                        {item.name}
                      </span>
                    </Flex>
                  </a>
                </Radio.Button>
              ))}
            </Radio.Group>
          </Sider>
          <Content
            style={{
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'auto',
              flex: 1,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
