import React, {useState} from 'react'
import {Form, Button, Container, Col, Row, Modal} from 'react-bootstrap'
import {fireDataBase} from './configBD'
//reCaptcha
import ReCAPTCHA from "react-google-recaptcha";

const typeDoc = [
  "Seleccione",
  "DNI",
  "PASAPORTE",
  "CARNET-DE-EXTRANJERIA"
]

const Options = (props) =>{
  return props.options.map((ele, index)=>
      <option value={ele} key={index}>{ele}</option>)
}

const Result = (props) =>{
  return (props.result ? <h1> Felicidades eres beneficioario del subsidio</h1> : <h1>Lo sentimos, por el momento no eres beneficiario</h1>)
}

const Subsidio =()=>{

  let [bdValue, setBdValue] = useState(false);
  let [result, setResult] = useState(false);


  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setResult(false);
  };
  const handleShow = () => {
    setShow(true);
    validateBD();
  }

  const onChange = (value) =>{
    console.log("Captcha value:", value);
  }

  const changeForm = (event) =>{
    let id = event.target.id;
    let value = event.target.value;
    setBdValue({...bdValue,[id]:value});
  }

  const validateBD = () =>{
    fireDataBase.ref('subsidio/').on('value',(snap)=>{
      const arrays = snap.val();
      Object.keys(arrays).map(obj=>{
        const resultArray =  Object.keys({...arrays[obj]}).map(obj1 => {
          let auxResult=false;
          console.log("form: "+bdValue[obj1]);
          if(arrays[obj][obj1] === bdValue[obj1]) auxResult = true;
          return auxResult;
        })
        
        const resultadoFinal = resultArray.reduce((aux, ele)=>{
          return aux*ele;
        }, true)
        
        if(resultadoFinal === 1) setResult(true);
      })
    });
  }

return(
  <Container>
    <Row className="justify-content-md-center">
      <Col sm={4}>
      <Form onChange={changeForm}>
        <Form.Group controlId="docType">
          <Form.Label>Tipo de documento:</Form.Label>
          <Form.Control as="select">
            <Options options={typeDoc}></Options>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="numeroDoc">
          <Form.Label>Número de documento:</Form.Label>
          <Form.Control type="number"/>
        </Form.Group>

        <Form.Group controlId="fecha">
          <Form.Label>Fecha de emision del DNI</Form.Label>
          <Form.Control type="date" />
        </Form.Group>

        <ReCAPTCHA
          sitekey="6LcsBvUUAAAAADea62Xq-dihWxh-SnToe09jjFe5"
          onChange={onChange}
        />
        <Button variant="primary" onClick={handleShow}>
          Validar
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Resultado:</Modal.Title>
          </Modal.Header>
          <Modal.Body><Result result={result}></Result></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

      </Form>
      </Col>
    </Row>
  </Container>
)
}

export default Subsidio