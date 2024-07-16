import React from 'react'
import Page from '../components/Page'
import Image from '../assets/image.jpeg'

const About: React.FC = () => {
  return (
    <Page name='Acerca de'>
      <div style={{margin:'30px 40px', textAlign:'center'}}>

        <img src={Image} alt="image" />
        <h2>Abner Aguilar</h2>
        <p>2022-1059</p>

        <br />

        <p>"El verdadero servicio a la comunidad se basa en la vigilancia constante y la seguridad, garantizando que cada ciudadano pueda vivir en paz y con confianza."</p>
      </div>
    </Page>
  )
}

export default About