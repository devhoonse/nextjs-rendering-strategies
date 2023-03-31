/**
 * 페이지 렌더링 전에 수행해야 할 외부 API 요청입니다.
 */
export async function getStaticProps() {

  const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await usersResponse.json();

  return {
    props: {
      users
    },
    revalidate: 600 // (초 단위) 다음 빌드까지 현재의 빌드된 페이지를 유지할 시간 간격
  }
}

/**
 * 서버 사이드에서 외부 API 호출하여 받아온 데이터로 SSG(+ISR) 렌더링하는 샘플 페이지
 * @param props 외부 API 로부터 받아온 데이터를 전달받을 매개변수
 * @constructor
 */
function StaticPropsSample(props: { users: Array<any>; }) {

  // 컴포넌트 구조
  return (
    <div>
      {props.users.map((user) => (
        <form key={user.id}>
          <fieldset>
            <legend>{user.name}</legend>
            <label htmlFor="name" style={{ display: 'block' }}>
              name :
              <input disabled type="text" id="name" value={user.name}/>
            </label>
            <label htmlFor="userName" style={{ display: 'block' }}>
              userName :
              <input disabled type="text" id="userName" value={user.username}/>
            </label>
            <label htmlFor="email" style={{ display: 'block' }}>
              email :
              <input disabled type="email" id="email" value={user.email}/>
            </label>
            <label htmlFor="phone" style={{ display: 'block' }}>
              phone :
              <input disabled type="phone" id="email" value={user.phone}/>
            </label>
          </fieldset>
        </form>
      ))}
      {JSON.stringify(props.users)}
    </div>
  );
}

// 외부에서 컴포넌트를 가져다 사용할 수 있도록 내보냅니다.
export default StaticPropsSample;
