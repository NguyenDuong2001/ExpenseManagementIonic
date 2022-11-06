import { IonButton, IonButtons, IonCardTitle, IonContent, IonHeader,IonIcon, IonItem, IonLabel, IonList, IonNote, IonPage, IonRouterLink, IonSearchbar, IonTitle, IonToolbar, useIonAlert, useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { deleteTrip, getAllTrip, } from '../database';
import { Trip } from '../models/Trip';
import './Home.css';
import {trash, addCircleSharp, add, addCircleOutline, createOutline, trashOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';


const Home: React.FC = () => {
	const [allTrip, setAllTrip] = useState<Trip[]>([])
    const history = useHistory()
    const [presentAlert] = useIonAlert();
    const [present] = useIonToast();
    
	const getTrips = async () => { 
		setAllTrip(await getAllTrip())
    };
    
    const handleDelete = async (id: number) => { 
        if (id === 0) {
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
                    await deleteTrip(id);   
                    present({
                        message: 'Delete successfully!',
                        color: 'success',
                        duration: 1000,
                        position: 'top'
                    });
                    setTimeout(() => history.go(0), 1000)
                }
                },
            ],
        })
    }

	useEffect(() => {
        getTrips();
	},[])
    
	return (
		<IonPage>
			<IonHeader collapse="condense">
				<IonToolbar color="light" className='text-center'>
					<IonTitle>Manager Trips</IonTitle>
					<IonButtons collapse={true} slot="end">
                        <IonRouterLink routerLink={"/create"}>
                            <IonIcon size='large' icon={addCircleOutline}></IonIcon>
                        </IonRouterLink>
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen={true}>
				<IonSearchbar animated={true} placeholder="Search Trips"></IonSearchbar>
				<IonList>
					{allTrip.length === 0 ?
						<div className="ion-text-center ion-margin-top">
							<IonNote color="medium">There aren't any trips</IonNote>
						</div>
						: allTrip.map(trip => 
                            <IonItem>
                                <IonRouterLink routerLink={"/detail/" + trip.id}>
                                    <IonLabel color='dark'>
                                        {trip.name}
                                    </IonLabel>
                                </IonRouterLink>
                                <IonRouterLink slot="end" routerLink={"/detail/" + trip.id}>
                                    <IonIcon size='large' icon={createOutline}></IonIcon>
                                </IonRouterLink>
                                <IonIcon onClick={async(e) => handleDelete(trip.id || 0)} color='danger' slot="end" icon={trashOutline}></IonIcon>
                            </IonItem>
						)}
                </IonList>
			</IonContent>
		</IonPage>
	);
};

export default Home;
