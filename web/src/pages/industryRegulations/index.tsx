import { industryRegulations } from '@/conf.json';
import { Button, Card, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.less';

const { Title, Paragraph } = Typography;

const IndustryRegulationsQA: React.FC = () => {
  const navigate = useNavigate();

  const handleStartChat = () => {
    navigate(`/chat?dialogId=${industryRegulations}&conversationId=&isNew=`);
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title level={2}>行业法规政策问答系统</Title>
        <Paragraph>
          本系统提供专业的行业法规政策咨询服务，您可以查询各类法规政策，
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

export default IndustryRegulationsQA;
