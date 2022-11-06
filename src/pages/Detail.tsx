import { IonButton, IonButtons, IonCheckbox, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonNote, IonPage, IonRouterLink, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonAlert, useIonToast } from '@ionic/react';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { deleteTrip, getTripById, insertTrip, updateTrip } from '../database';
import { Trip } from '../models/Trip';
import './Detail.css';

interface IdParam {
    id : string;
}

const Detail: React.FC = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [number_of_tourists, setNumberOfTourists] = useState(0)
    const [organizational_unit, setOrganizationalUnit] = useState('')
    const [destination, setDestination] = useState('')
    const [date, setDate] = useState('')
    const [type, setType] = useState('')
    const [is_risk, setIsRisk] = useState(false)
    const {id} = useParams<IdParam>()
    const [presentAlert] = useIonAlert();
    const [present] = useIonToast();
    const history = useHistory()

    const fetchDataFromDB = async () => { 
        const trip = await getTripById(Number.parseInt(id)) as Trip
        setName(trip.name)
        setDescription(trip.description)
        setOrganizationalUnit(trip.organizational_unit)
        setDestination(trip.destination)
        setDate(trip.date)
        setType(trip.type)
        setIsRisk(trip.is_risk)
        setNumberOfTourists(trip.number_of_tourists)
    };    

    const handleUpdate = async () => {
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
        await presentAlert({
            header: 'Are you sure?',
            cssClass: 'custom-alert',
            buttons: [
            {
                text: 'No',
                cssClass: 'alert-button-cancel',
            },
            {
                text: 'Yes',
                cssClass: 'alert-button-confirm',
                handler: async () => {
                    const trip: Trip = {
                        id : parseInt(id),
                        name,
                        description,
                        number_of_tourists,
                        organizational_unit,
                        is_risk,
                        date,
                        destination,
                        type
                    };
                    await updateTrip(trip);
                    present({
                        message: 'Update successfully!',
                        color: 'success',
                        duration: 1000,
                        position: 'top'
                    });

                    history.go(-1)
                    setTimeout(()=> history.go(0), 5)
                }
                },
            ],
        })
    }

    const handleDelete = async () => { 
        const trip_id = parseInt(id)
        if (trip_id === 0) {
            return;
        }
        await presentAlert({
            header: 'Are you sure?',
            cssClass: 'custom-alert',
            buttons: [
            {
                text: 'No',
                cssClass: 'alert-button-cancel',
            },
            {
                text: 'Yes',
                cssClass: 'alert-button-confirm-delete',
                handler: async () => {
                    await deleteTrip(trip_id);   
                    present({
                        message: 'Delete successfully!',
                        color: 'success',
                        duration: 1000,
                        position: 'top'
                    });

                    setTimeout(() => history.go(-1), 1000)
                    setTimeout(() => history.go(0), 1010)
                }
                },
            ],
        })
    }

    useEffect(() => {
        fetchDataFromDB()
    },[id])
	
	return (
		<IonPage>
            <IonHeader>
				<IonToolbar color="light" className='text-center'>
                <IonTitle>Trip</IonTitle>
                <IonButtons collapse={true} slot="start">
                        <IonRouterLink  routerLink={"/"}>
                            <IonButton>Back</IonButton>
                        </IonRouterLink>
                    </IonButtons>
                <IonButtons collapse={true} slot="end">
                        <IonButton color='danger' onClick={handleDelete}>Delete</IonButton>
                </IonButtons>    
				</IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true}>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Name</IonLabel>
                    <IonInput value={name} clearInput={true} onIonChange={(e) => setName(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Description</IonLabel>
                    <IonInput value={description} clearInput={true} type='text' onIonChange={(e) => setDescription(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Number of tourists</IonLabel>
                    <IonInput type='number' value={number_of_tourists}  clearInput={true} onIonChange={(e) => setNumberOfTourists(parseInt(e.detail.value!) || 0)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Destination</IonLabel>
                    <IonInput type='text' value={destination}  clearInput={true} onIonChange={(e) => setDestination(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Organizational Unit</IonLabel>
                    <IonInput type='text' value={organizational_unit} clearInput={true} onIonChange={(e) => setOrganizationalUnit(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="stacked" color='medium'>Date</IonLabel>
                    <IonInput type='date' value={date} onIonChange={(e) => setDate(e.detail.value!)}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating" color='medium'>Type</IonLabel>
                    <IonSelect onIonChange={(e) => setType(e.detail.value!)} value={type}>
                    <IonSelectOption value="Go on beach">Go on beach</IonSelectOption>
                        <IonSelectOption value="Go mountain climbing">Go mountain climbing</IonSelectOption>
                        <IonSelectOption value="Go skiing">Go skiing</IonSelectOption>
                        <IonSelectOption value="Cultural tourism">Cultural tourism</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem lines='none'  className='ion-margin-vertical'>
                    <IonCheckbox checked={is_risk} slot="start" onIonChange={(e) => setIsRisk(e.detail.checked!)}></IonCheckbox>
                    <IonLabel>Risk</IonLabel>
                </IonItem>
                <IonButton className='ion-margin-vertical' expand="block" onClick={handleUpdate}>Update</IonButton>
			</IonContent>
		</IonPage>
	);
};

export default Detail;
