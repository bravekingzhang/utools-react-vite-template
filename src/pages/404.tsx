import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>404 - 页面不存在</h1>
      <p>很抱歉，您访问的页面不存在。</p>
      <Link to="/">返回主页</Link>
    </div>
  );
};

export default NotFoundPage;
