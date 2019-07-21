import React from 'react';
import guestAvatar from '../img/guest.png';


class GuestView extends React.Component {

    hasGuestArrived() {
        if(this.props.guest.Present !== "11:59:59 PM") {
            return <div className="ui disabled secondary button" >
                        <i className="check square outline icon"></i>
                        Arrivé à {this.props.guest.Present}
                    </div>
        } else {
            return <div className="ui primary button" onClick={() => this.props.onArrivalCheck(this.props.guest)}>
                        <i className="sign-in icon"></i>                    
                        <span>Arrivé ?</span>
                    </div>
        }     
    }

    render() {
        return (
            <div className="ui container" style={{width: "40%"}} >
                <div className="ui divided items" style={{padding: "20px"}}>
                    <div className="item">
                        <div className="image guest_avatar">
                            <img alt="guest avatar" src={guestAvatar} />
                        </div>
                        <div className="content-centered content" style={{padding: "20px"}}>
                            <span className="ui blue header">{this.props.guest.Names}</span>
                            <div className="meta">
                                <i className="user icon"></i>
                                <span className="cinema" >{this.props.guest.Number} 
                                    {parseInt(this.props.guest.Number) > 1 ? " invités attendus" : " invité attendu"}</span>
                            </div>
                            <div className="description">
                                <p></p>
                            </div>
                            <div className="ui label">{this.props.guest.Table}</div>
                            <div className="extra">
                                {this.hasGuestArrived()}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default GuestView;