import { useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams<{ id: string }>();

  // 根据 id 获取详情数据的逻辑
  // ...

  return (
    <div>
      <h1>详情页</h1>
      <p>当前 id：{id}</p>
      {/* 显示详情数据 */}
      {/* ... */}
    </div>
  );
};

export default Detail;
