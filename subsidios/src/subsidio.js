import React, {useState} from 'react'
import {Form, Button, Container, Col, Row, Modal, Spinner} from 'react-bootstrap'
import {fireDataBases} from './configBD'
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
      <option value={index} key={index}>{ele}</option>)
}

const Result = (props) =>{
  return (props.result ? <h1> Felicidades eres beneficioario del subsidio</h1> : <h1>Lo sentimos, por el momento no eres beneficiario</h1>)
}

const Load = (props) => {
  return (
    <div><Spinner animation="border" /><strong> Cargando ... </strong></div>
  )
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

    validateBdFilter();
  }

  const onChange = (value) =>{
    console.log("Captcha value:", value);
  }

  const changeForm = (event) =>{
    let id = event.target.id;
    let value = event.target.value;
    setBdValue({...bdValue,[id]:value});
  }

const validateBdFilter = () =>{

  const keysForm = Object.keys(bdValue).map(ele=>ele);
  const bdNames = ["beneficiadosPart1/","beneficiadosPart2/"] 

  const promises = fireDataBases.map((fireDataBase, index) =>{
    return new Promise((resolve, reject)=>{
      try{
        return fireDataBase.ref(bdNames[index])
        .orderByChild(keysForm[2])
        .equalTo(bdValue[keysForm[2]])
        .on("value",
        (snapshots)=>{
          let resultadosFinal = [];
          let resultadoFinal = 0;
  
            if(snapshots.val()){
              snapshots.forEach((snapshot)=>{
                resultadosFinal.push(
                  Object.keys(bdValue).reduce((aux, ele)=>{
                  return (bdValue[ele]===snapshot.val()[ele] ? aux* true: aux *false)
                  }, true)
                )
              });
              resultadoFinal = resultadosFinal.reduce((aux, ele)=>{return ele + aux}, false);
            }
            
            resolve(resultadoFinal);
        },
        (error)=>{
          // console.log("La lectura fallo"+ error.code)
        })
      }
      catch{
        reject(`Hubo un problema`)
      }
    })
  })

  Promise.all(promises).then(results=>{
    const resultadoFinalFinal = results.reduce((aux, ele)=>{return ele + aux}, false);
    setResult(resultadoFinalFinal);
    setShow(true);
  }).catch(reason =>{
    // console.log("error: "+reason);
  })
}

return(
  <Container>
    <Row className="justify-content-md-center">
      <Col sm={4}>
      <Form onChange={changeForm}>
        <Form.Group controlId="TI_DOCU_IDEN">
          <Form.Label>Tipo de documento:</Form.Label>
          <Form.Control as="select">
            <Options options={typeDoc}></Options>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="NU_DOCU_IDEN">
          <Form.Label>Número de documento:</Form.Label>
          <Form.Control type="number"/>
        </Form.Group>

        <Form.Group controlId="FE_EMIS_DOCU_IDEN">
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