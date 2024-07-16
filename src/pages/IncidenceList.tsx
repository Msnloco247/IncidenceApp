import React from 'react'
import Page from '../components/Page'
import { useStorage } from '../hooks/useStorage'
import { IonButton, IonList, useIonViewWillEnter,IonCard,IonCardContent,IonCardHeader, IonCardSubtitle,IonCardTitle,IonAlert } from '@ionic/react';
import audioService from '../services/audioService';

const IncidenceList :React.FC= () => {
    const {incidences , initStorage, deleteIncidences} = useStorage();
    
    const playAudio = (audio:string | undefined) => {
        if (audio) {
          audioService.playAudio(audio);
        } else {
          console.error('No audio file to play.');
        }
      };

      const stopAudio = () => {
        audioService.stopAudio();
      };

      useIonViewWillEnter(()=>{
        initStorage();
      })
  return (
    <Page name='Lista de incidencias'>
      
          <IonButton fill='clear' color={'danger'} id="delete">borrar incidencias</IonButton>
          <IonAlert
          trigger="delete"
          header="Borrar Incidencias"
          message="Estas seguro que desear eliminar todas las incidencias?"
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              
            },
            {
              text: 'Eliminar',
              cssClass:'alert-button-confirm',
              role: 'confirm',
              
              handler: () => {
                deleteIncidences();
              },
            },
          ]}
         
        ></IonAlert>
        <IonList>
            {
                incidences.length > 0 ? 
                incidences.map((incidence, key) => (
                  
                    <div  key={key}>
                      <IonCard style={{margin:'15px 30px'}}>
                        <img alt="Incidence photo" src={incidence.photo} />
                        <IonCardHeader>
                          <IonCardSubtitle>{incidence.date}</IonCardSubtitle>
                          <IonCardTitle>{incidence.title}</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>{incidence.description}</IonCardContent>
                        <IonButton color="success" fill='clear' onClick={() => playAudio(incidence.audio)}>Reproducir Audio</IonButton>
                        <IonButton color="danger" fill='clear' onClick={stopAudio}>Detener Reproducción</IonButton>
                      </IonCard>
                      
                      
                    </div>
                ))
                :
                <span>No existen incidencias hasta ahora</span>
            }
        </IonList>
    </Page>
  )
}

export default IncidenceList