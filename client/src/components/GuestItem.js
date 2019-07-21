import React from 'react';

const GuestItem = ({guest, onGuestSelected}) => {
    
    const guestCheck = guest.Present !== "11:59:59 PM" ? 
    <i  className="check circle outline icon" 
        style={{float:"right", color: "green"}}></i> 
    : "";
    
    return (
        <div onClick={() => onGuestSelected(guest)} className="item guest">
            {guest.Names}{guestCheck}
        </div>
    );
};

export default GuestItem;