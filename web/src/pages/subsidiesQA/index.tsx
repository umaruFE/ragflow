import { subsidiesQA } from '@/conf.json';
import { Button, Card, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.less';

const { Title, Paragraph } = Typography;

const SubsidiesQA: React.FC = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate(`/chat?dialogId=${subsidiesQA}&conversationId=&isNew=`);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2}>专项补贴政策问答系统</Title>
        <Paragraph>
          本系统提供专业的专项补贴政策咨询服务，您可以查询各类补贴政策，
          获取个性化建议，并与智能助手进行实时交流。
        </Paragraph>
        <Button
          type="primary"
          size="large"
          onClick={handleStartChat}
          className={styles.startButton}
        >
          开始咨询
        </Button>
      </Card>
    </div>
  );
};

export default SubsidiesQA;
