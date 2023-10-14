import {
  Input,
  Radio,
  Slider,
  Space,
  Button,
  Message,
} from "@arco-design/web-react";
import { Grid } from "@arco-design/web-react";
import { useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";
import "./markdown.css";
const RadioGroup = Radio.Group;
const InputSearch = Input.Search;

const Row = Grid.Row;
const Col = Grid.Col;
//
const ArticleTypeOptions = [
  {
    value: "幽默",
    label: "幽默",
  },
  {
    value: "普通",
    label: "普通",
  },
  {
    value: "专业",
    label: "专业",
  },
];
const ArticleLengthOptions = [
  {
    value: 1000,
    label: "短篇",
  },
  {
    value: 1500,
    label: "中等",
  },
  {
    value: 2500,
    label: "长篇",
  },
];

const App = () => {
  const [articleType, setArticleType] = useState("普通");
  const [articleLength, setArticleLength] = useState(1000);
  const [modelTemperature, setModelTemperature] = useState(0.5);
  const [articleContent, setArticleContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handCopyArticle = async () => {
    // 复制value的值
    await navigator.clipboard.writeText(articleContent);
    // 提示复制成功
    Message.success("内容复制成功");
  };
  const handelBtnClick = async (value: string) => {
    setArticleContent("");
    setLoading(true);
    try {
      const stream = await window.preload.getStreamResponseFromChatGpt(
        [
          {
            role: "system",
            content: `你是一位专业的微信公众号文章写手，擅长撰写爆款文章，请以{${articleType}}风格撰写一篇字数约为{${articleLength}}字的文章，需要保证文章完整，使用markdown格式输出。\n
          ### 一些规则：
          1、段落不要太多，控制在3-5个以内。
          2、文章的开头对于背景的阐述很重要，想办法写的令人发人深省，引起读者的共鸣。
          3、结尾可以给出一些思考性质的问题，引导读者思考。
          4、当你需要给出代码时，请使用\`\`\`{language}
              code
          \`\`\`的格式，这样会让你的文章更加专业。
          `,
          },
          {
            role: "user",
            content: `### 用户给出的背景信息]\n
          ${value}
          `,
          },
        ],
        modelTemperature
      );
      for await (const chunk of stream) {
        setArticleContent((prev: string) => {
          const currentToken = chunk.choices[0].delta.content
            ? chunk.choices[0].delta.content
            : "";
          return prev ? prev + currentToken : currentToken;
        });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div style={{ width: "100%" }}>
      <Row style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Space direction="vertical">
            <label>文章类型</label>
            <RadioGroup
              options={ArticleTypeOptions}
              size="mini"
              mode="outline"
              type="button"
              defaultValue={articleType}
              onChange={setArticleType}
            />
          </Space>
        </Col>
        <Col span={8}>
          <Space direction="vertical">
            <label>文章长度</label>
            <RadioGroup
              options={ArticleLengthOptions}
              size="mini"
              mode="outline"
              type="button"
              defaultValue={articleLength}
              onChange={setArticleLength}
            />
          </Space>
        </Col>
        <Col span={8}>
          <Space direction="vertical">
            <label>模型温度</label>
            <Slider
              min={0}
              max={1}
              style={{ width: 180 }}
              step={0.1}
              showTicks={true}
              defaultValue={modelTemperature}
              onChange={(value) =>
                setModelTemperature(
                  typeof value === "number" ? value : value[0]
                )
              }
            ></Slider>
          </Space>
        </Col>
      </Row>
      <Row>
        <Col span={22}>
          <InputSearch
            size="large"
            searchButton="提交"
            style={{ width: "80%" }}
            onSearch={handelBtnClick}
            placeholder="请输入文章主题"
            loading={loading}
          ></InputSearch>
        </Col>
        <Col span={2}>
          <Button type="secondary" size="large" onClick={handCopyArticle}>
            复制
          </Button>
        </Col>
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "start" }}>
          <div className="markdown">
            <Markdown
              rehypePlugins={[rehypeKatex]}
              remarkPlugins={[remarkGfm, remarkMath]}
              children={articleContent}
              components={{
                code: ({ className, children, ...props }) => {
                  const match = /language-(\w+)/.exec(className || "");
                  return match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      style={darcula}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            ></Markdown>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default App;
