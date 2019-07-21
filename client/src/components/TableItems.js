import React from 'react';
import GuestItem from './GuestItem';

class TableItems extends React.Component {
    
    render() {

        let availablePlaces = this.props.places;
        for(let guest of this.props.guests){
            if(guest.Table === this.props.table) {
                guest.Present !== "11:59:59 PM" ? availablePlaces -= guest.Number : availablePlaces += 0;
            }
        }
    
        const guestOnTables = this.props.guests.filter(guest => {
            return guest.Table === this.props.table });

        const printGuests = guestOnTables.map( guest => {
                return <GuestItem key={guest.CODE} guest={guest} onGuestSelected={this.props.onGuestSelected}/>;
            });
        
        return (
            <div className="ui blue cards tables" style={{margin:"0px 10px"}}>
                <div className="card">
                    <div className="content">  
                        <div className="ui blue center aligned header" style={{marginTop:"5px", marginBottom:"0"}}>{this.props.table}</div> 
                        <div className="center aligned meta">{availablePlaces} Places disponibles</div>
                        <br/>
                        <div className="description" style={{marginBottom:"10px"}}>
                            <div className="ui celled ordered list">
                                {printGuests}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TableItems;