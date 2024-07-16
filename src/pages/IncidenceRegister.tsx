import { IonList,IonItem, IonInput, IonButton} from '@ionic/react';
import {useState} from 'react'
import Page from '../components/Page'
import { useStorage } from '../hooks/useStorage';
import audioService from '../services/audioService';
import { Camera, CameraResultType } from '@capacitor/camera';
import { IncidenceForm } from '../models/IncidenceModel';


const IncidenceRegister: React.FC = () => {

  const {createIncidence } = useStorage();

    const [formData, setFormData] = useState<IncidenceForm>({
        title: '',
        description: '',
        photo: '',
        audio:''
      });   
      const [isRecording, setIsRecording] = useState(false);

      const toggleRecording = async () => {
        if (isRecording) {
          try {
            const audioPath = await audioService.stopRecording();
            setFormData(prev => ({...prev, audio: audioPath}));
            setIsRecording(false);
          } catch (error) {
            console.error('Error stopping recording:', error);
          }
        } else {
          audioService.startRecording();
          setIsRecording(true);
        }
      };

      const takePhoto = async () => {
        try {
          const image = await Camera.getPhoto({
            resultType: CameraResultType.DataUrl
          });
          
          setFormData(prevForm =>({
            ...prevForm,
            photo: image.dataUrl
          }));
        } catch (error) {
          console.log(error);        
        }
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formData.title && formData.description && formData.photo && formData.audio != ''){
          await createIncidence(formData)
          setFormData({title:null, description:null, photo:'', audio:''})
        
        }
      }

  return (
    <Page name='Registro de incidencias'>
        <h2>Registro de incidencias</h2>
          
        <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', justifyContent:'center'}} >

          <IonList>

            <IonItem>
              <IonInput label="Titulo" name="title" value={formData.title} onIonChange={(e) => setFormData(prev => ({...prev, title:e.detail.value}))} />
            </IonItem>
            <IonItem>
              <IonInput label="Descripcion" name="description" value={formData.description} onIonChange={(e) => setFormData(prev => ({...prev, description:e.detail.value}))}/>
            </IonItem>
            <IonItem >
              <div style={{margin:'15px 5px', display:'flex'}}>
                <IonButton onClick={takePhoto} shape="round" fill="outline" color="success">
                  Tomar Foto
                </IonButton>
                <IonButton onClick={toggleRecording} shape="round" fill="outline" color="tertiary">
                  {isRecording ? 'Dejar de Grabar' : 'Grabar audio'}
                </IonButton>
              </div>
            </IonItem>
          </IonList>
            <IonButton style={{marginTop:'15px'}} shape='round' fill='outline' color="success" type='submit'>Enviar</IonButton>
        </form>
    </Page>
  )
}

export default IncidenceRegister