import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonRouterLink, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { insertTrip } from '../database';
import { Trip } from '../models/Trip';
import './Create.css';
import { useHistory } from 'react-router';

const Create: React.FC = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [number_of_tourists, setNumberOfTourists] = useState(0)
    const [organizational_unit, setOrganizationalUnit] = useState('')
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('')
    const [is_risk, setIsRisk] = useState(false)
    const history = useHistory()
    const [present] = useIonToast();
    
    const handleCreate = async () => {
        if (!name) {
            present({
                message: 'Field name invalid!',
                color: 'warning',
                duration: 1000,
                position: 'top'
            });
            return;
        }
        if (!number_of_tourists) {
            present({
                message: 'Field number of tourists invalid!',
                color: 'warning',
                duration: 1000,
                position: 'top'
            });
            return;
        }
        if (!destination) {
            present({
                message: 'Field destination invalid!',
                color: 'warning',
                duration: 1000,
                position: 'top'
            });
            return;
        }
        if (!date) {
            present({
                message: 'Field date invalid!',
                color: 'warning',
                duration: 1000,
                position: 'top'
            });
            return;
        }
        if (!type) {
            present({
                message: 'Field type invalid!',
                color: 'warning',
                duration: 1000,
                position: 'top'
            });
            return;
        }
        const trip : Trip = {
            name,
            description,
            number_of_tourists,
            organizational_unit,
            is_risk,
            date,
            destination,
            type
        };
        await insertTrip(trip);
        present({
            message: 'Create successfully!',
            color: 'success',
            duration: 1000,
            position: 'top'
        });
        
        history.go(-1)
        setTimeout(()=> history.go(0), 5)
	};
	
	return (
		<IonPage>
            <IonHeader>
				<IonToolbar color="light" className='text-center'>
                <IonTitle>Add Trip</IonTitle>
                <IonButtons collapse={true} slot="start">
                        <IonRouterLink routerLink={"/"}>
                            <IonButton>Back</IonButton>
                        </IonRouterLink>
                </IonButtons>
				</IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Name</IonLabel>
                    <IonInput  clearInput={true} onIonChange={(e) => setName(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Description</IonLabel>
                    <IonInput  clearInput={true} type='text' onIonChange={(e) => setDescription(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Number of tourists</IonLabel>
                    <IonInput type='number'  clearInput={true} onIonChange={(e) => setNumberOfTourists(parseInt(e.detail.value!) || 0)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Destination</IonLabel>
                    <IonInput type='text'  clearInput={true} onIonChange={(e) => setDestination(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Organizational Unit</IonLabel>
                    <IonInput type='text' clearInput={true} onIonChange={(e) => setOrganizationalUnit(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked" color='medium'>Date</IonLabel>
                    <IonInput type='date' onIonChange={(e) => setDate(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Type</IonLabel>
                    <IonSelect onIonChange={(e) => setType(e.detail.value!)}>
                        <IonSelectOption value="Go on beach">Go on beach</IonSelectOption>
                        <IonSelectOption value="Go mountain climbing">Go mountain climbing</IonSelectOption>
                        <IonSelectOption value="Go skiing">Go skiing</IonSelectOption>
                        <IonSelectOption value="Cultural tourism">Cultural tourism</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem lines='none'  className='ion-margin-vertical'>
                    <IonCheckbox slot="start" onIonChange={(e) => setIsRisk(e.detail.checked!)}></IonCheckbox>
                    <IonLabel>Risk</IonLabel>
                </IonItem>
                <IonButton className='ion-margin-vertical' expand="block" onClick={handleCreate}>Create</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Create;
