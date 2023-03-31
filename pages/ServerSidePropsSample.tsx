import {useEffect, useState} from "react";
import dynamic from "next/dynamic";

// 컴포넌트를 동적 import 로 불러옵니다. (서버에서는 렌더링하지 않습니다.)
const HighlightSyntax = dynamic(
  () => import('@/components/HighlightSyntax'),
  { ssr: false }
);

/**
 * 페이지 렌더링 전에 수행해야 할 외부 API 요청입니다.
 */
export async function getServerSideProps() {

  const userResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');
  const user = await userResponse.json();

  return {
    props: {
      user
    }
  };
}

/**
 * 서버 사이드에서 외부 API 호출하여 받아온 데이터로 CSR 렌더링하는 샘플 페이지
 * @param props 외부 API 로부터 받아온 데이터를 전달받을 매개변수
 * @constructor
 */
function ServerSidePropsSample(props: { user: { name: string; } }) {

  // 컴포넌트가 브라우저에 렌더링 되었는지 여부를 기록할 상태 변수입니다.
  const [isClient, setIsClient] = useState(false);

  // 컴포넌트가 브라우저에 렌더링 된 경우에 실행됩니다.
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 컴포넌트 구조
  return (
    <div>
      <div>isClient: {`${isClient}`}</div>
      {
        isClient && ( // 아래 컴포넌트를 브라우저 렌더링의 경우에만 렌더링 합니다.
          <HighlightSyntax code={
            `
              console.log('You are running this component on ${typeof window !== 'undefined' ? 'client': 'server'}');
              console.log('Hello ${props.user.name}!');
            `
          } />
        )
      }
    </div>
  );
}

// 외부에서 컴포넌트를 가져다 사용할 수 있도록 내보냅니다.
export default ServerSidePropsSample;
