import Block from "../components/block";
import {Button, Container, Form} from "react-bootstrap";
import {useState} from "react";
import {useNavigate, useOutletContext, useParams} from "react-router-dom";
import {RootContextType} from "@/pages/root";
import {apiRegister} from "@/api/user";
import {ServerMessage} from "@/interfaces/server";

const RegisterForm = () => {
  const redirect = useNavigate();
  const {addToast} = useOutletContext<RootContextType>();
  const {login, password} = useParams();
  const [formData, setFormData] = useState({
    username: login ?? '',
    password: ''
  } as { username: string, password: string });

  const [pass, setPass] = useState(password ?? '');

  const [isDisabled, setIsDisabled] = useState(false);

  const handler = ({username, password}: { username?: string, password?: string }) => {
    setFormData({username: username ?? formData.username, password: password ?? formData.password});
  }

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
              defaultValue={login}
              autoComplete="username"
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Пароль:</Form.Label>
            <Form.Control
              type="password"
              disabled={isDisabled}
              placeholder="Пароль"
              required
              onChange={(e) => setPass(e.target.value)}
              defaultValue={password}
              autoComplete="current-password"
            />
          </Form.Group>
          <Form.Group className="mb-4" controlId="formBasicPasswordConfirm">
            <Form.Label>Подтвердите пароль:</Form.Label>
            <Form.Control
              type="password"
              disabled={isDisabled}
              placeholder="Пароль ещё раз"
              required
              onChange={(e) => {
                e.target.value === pass ? handler({password: e.target.value}) : null;
              }}
              autoComplete="current-password"
            />
          </Form.Group>
          <Container className='d-flex justify-content-end gap-4'>
            <Button
              variant="outline-light"
              type="button"
              disabled={isDisabled}
              onClick={() => {
                setIsDisabled(true);
                if (!!formData.password && !!formData.username) {
                  apiRegister(formData).then((data) => {
                    setIsDisabled(false);
                    addToast({
                      error: data.error,
                      success: data.success,
                      message: data.message,
                      delay: 3000,
                    });
                    redirect(`/login/${formData.username}`)
                  }).catch((e: ServerMessage) => {
                    addToast(e);
                    setIsDisabled(false);
                  });
                } else {
                  setIsDisabled(false);
                  addToast({
                    error: true,
                    message: 'Пароли не совпадают или логин не заполнен!',
                    delay: 5000,
                  })
                }
              }
              }>
              Зарегистрироваться
            </Button>
          </Container>
        </Form>
      </Block>
    </div>
  );
}

export default RegisterForm