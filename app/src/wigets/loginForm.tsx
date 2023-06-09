import {useOutletContext, useNavigate, useParams, useSearchParams} from 'react-router-dom';
import Block from "../components/block";
import {Button, Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {RootContextType} from "@/pages/root";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {userInfoState} from "@/store/userInfo";
import {apiLogin} from "@/api/user";
import {ServerMessage} from "@/interfaces/server";

const LoginForm = () => {
  const {addToast} = useOutletContext<RootContextType>();
  const redirect = useNavigate();
  const {username} = useParams();
  const [searchParams] = useSearchParams();
  const from = searchParams.get('from');
  const [formData, setFormData] = useState({
    username: username ?? '',
    password: ''
  } as { username: string, password: string });
  const [isDisabled, setIsDisabled] = useState(false);
  const userInfo = useRecoilValue(userInfoState);
  const setUserInfo = useSetRecoilState(userInfoState);

  const handler = ({username, password}: { username?: string, password?: string }) => {
    setFormData({
      username: username ?? formData.username,
      password: password ?? formData.password
    })
  }

  useEffect(() => {
    if (userInfo && !!from) {
      redirect(from);
      return
    }
  }, [userInfo])

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <Block className="mw-100 w-100 w-sm-400">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Логин:</Form.Label>
            <Form.Control
              type="text"
              disabled={isDisabled}
              placeholder="Имя пользователя"
              required
              onChange={(e) => handler({username: e.target.value})}
              defaultValue={username}
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPassword">
            <Form.Label>Пароль:</Form.Label>
            <Form.Control
              type="password"
              disabled={isDisabled}
              placeholder="Пароль"
              required
              onChange={(e) => handler({password: e.target.value})}
              autoComplete="current-password"
            />
          </Form.Group>
          <Container className='d-flex justify-content-end gap-4'>
            <Button
              variant="outline-light"
              type="button"
              disabled={isDisabled}
              onClick={() => {
                redirect(`/register/${formData.username}/${formData.password}`);
              }}
            >
              Зарегистрироваться
            </Button>
            <Button
              variant="outline-blue"
              type="button"
              disabled={isDisabled || !formData.username.length || !formData.password.length}
              onClick={() => {
                setIsDisabled(true);
                if (!!formData.password && !!formData.username) {
                  apiLogin(formData).then((data) => {
                    setIsDisabled(false);
                    addToast({error: data.error, success: data.success, message: data.message, delay: 3000});
                    setUserInfo(data.user);
                    redirect(from ?? '/');
                  }).catch((e: ServerMessage) => {
                    addToast(e);
                    setIsDisabled(false);
                  });
                } else {
                  addToast({error: true, message: 'Не введён логин или пароль!', delay: 5000});
                  setIsDisabled(false);
                }
              }}
            >
              Войти
            </Button>
          </Container>
        </Form>
      </Block>
    </div>
  );
}

export default LoginForm