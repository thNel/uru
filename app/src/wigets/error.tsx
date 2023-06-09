import {useRouteError} from "react-router-dom";
import Block from "../components/block";

const Error = () => {
  const error: any = useRouteError();

  return (
    <>
      <Block className="text-center">
        <>
          <h1>Что-то пошло не так...</h1>
          <p className="mb-0">Извините, произошла непредвиденная ошибка.</p>
        </>
      </Block>
      <Block>
        <p className="text-center">
          <i>{`${error?.status}. ${error?.statusText}` || error?.message}</i>
        </p>
      </Block>
    </>
  );
}

export default Error;