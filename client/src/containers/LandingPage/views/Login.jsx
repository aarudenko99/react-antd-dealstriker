import React from 'react'
import {
  Button,
  FormGroup,
  Container,
  Row,
  Col,
  Form,
  Card,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class View extends React.Component {
  state = {
    email: '',
    password: '',
  }

  componentDidMount() {}

  render() {
    return (
      <div id="formContent" className="m">
        <Container>
          <Row
            className="d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
          >
            <Col md={4}>
              <Card bg="light">
                <div className="my-4 text-center text-primary">
                  <h3>LOGO</h3>
                </div>
                <Card.Body>
                  <Form>
                    <FormGroup>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="info@example.com"
                      />
                    </FormGroup>

                    <FormGroup>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter Password"
                      />
                    </FormGroup>

                    <Button variant="primary" block>
                      Login
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              <div className="mt-4 text-center">
                <Form.Label>
                  Don't you have account? <Link to="/register">Signup Now</Link>
                </Form.Label>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

export const Login = View
