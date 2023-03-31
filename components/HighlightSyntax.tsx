import {useEffect} from "react";
import hljs from 'highlight.js';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/a11y-light.css';

/**
 * 서버 사이드(Node.js)에서 실행하면 에러가 나는 코드의 실행을 클라이언트에서 실행되도록 하는 방법
 * > React.useEffect Hook 을 활용한다.
 * @param code
 * @constructor
 */
function HighlightSyntax({ code }: { code: string; }) {

  // init highlight.js (브라우저에서 렌더링할 때에만 동작합니다.)
  useEffect(() => {
    hljs.registerLanguage('javascript', javascript);
    hljs.initHighlighting();
  }, []);

  // 컴포넌트 구조
  return (
    <>
      <pre>
        <code className="js">{code}</code>
      </pre>
    </>
  );
}

// 외부에서 컴포넌트를 가져다 사용할 수 있도록 내보냅니다.
export default HighlightSyntax;
