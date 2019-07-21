import React from 'react';
import './app.css';
import SearchBar from './SearchBar';
import TableList from './TableList';
import GuestView from './GuestView';
import axios from 'axios'

class App extends React.Component {
    
    state = {bestGuest: {}, isFetchingGuests: true, isFetchingTables: true, guestsToDisplay: [], myGuests: [], selectectedGuest: null, tablesToDisplay: [], tables: []};

    onWordEntered = (word) => {
        const wordLower = word.toLowerCase();
        this.setState({guestsToDisplay: [], tablesToDisplay: []});
        if(word === "") {
            this.setState({guestsToDisplay: this.state.myGuests, tablesToDisplay: this.state.tables});
        } else {
            this.setState(state => {
                const guestsToDisplay = state.myGuests.map(g => {
                    if(g.CODE.toLowerCase().indexOf(wordLower) > -1) {
                        return g;
                    }
                    if(g.Names.toLowerCase().indexOf(wordLower) > -1) {
                        return g;
                    }
                    if(g.Table.toLowerCase().indexOf(wordLower) > -1) {
                        return g;
                    }
                    return {};
                });

                const tablesToDisplay = this.state.tables.map( table => {
                    for(let guest of guestsToDisplay) {
                        if(guest.Table === table.Name) {
                            return table;
                        }
                    }
                    return null;
                });
                return {
                    guestsToDisplay,
                    tablesToDisplay
                };
            });
        }
    }

    componentDidMount() {
       this.getGuests();
       this.getTables();
       this.timerGuests = setInterval(() => {
           this.getGuests();
       }, 60000);
      /* this.timerTables = setInterval(() => {
            this.getTables();
        }, 45000); */

    }

    componentWillUnmount() {
        clearInterval(this.timerGuests);
        this.timerGuests = null;
       /* clearInterval(this.timerTables);
        this.timerTables = null; */
    }

    onGuestSelected = (guest) => {
        this.setState({selectectedGuest: guest});  
    }

    onArrivalCheck = (guest) => {
        this.setState(state => {
            const myGuests = state.myGuests.map(g => {
                if(g.CODE === guest.CODE){
                    const currTime = new Date().toLocaleTimeString();
                    g.Present = currTime;
                    console.log(`Added :${g.Present}`);
                    return g;
                }else {
                    return g;
                }
            });

            axios.post('api/postGuests', this.state.myGuests)
            .then(response => console.log(response))
            .catch(error => console.log(error));
            
            return {
                myGuests,
            };
        });
    }

    getGuests = async() => {
        
        this.setState({isFetchingGuests: true});
        const response = await axios('api/guest_list');
        if(response.status !== 200) throw Error(response.message);
        const selectectedGuest = !this.state.selectectedGuest ? response.data[1] : this.state.selectectedGuest;
        const myGuests = response.data;

        const guestsToDisplay = this.state.guestsToDisplay.length === 0 ? response.data : this.state.guestsToDisplay;

        const bestGuest = myGuests.reduce((pGuest, cGuest) => 
        Date.parse("07/27/2019 " + pGuest.Present) < Date.parse("07/27/2019 " + cGuest.Present) ? pGuest : cGuest);

        this.setState({
            guestsToDisplay,
            myGuests,
            selectectedGuest,
            bestGuest,
            isFetchingGuests: false
        });
        return response.data;
    }

    getTables = async() => {
        this.setState({isFetchingTables: true});
        const response = await axios('api/tables');

        const tablesToDisplay = this.state.tablesToDisplay.length === 0 ? response.data : this.state.tablesToDisplay;

        if(response.status !== 200) throw Error(response.message);
        this.setState({
            tablesToDisplay, 
            tables: response.data,
            isFetchingTables: false
        });
        return response.data;
    }

    render() {
        const { bestGuest, isFetchingTables, isFetchingGuests } =  this.state ;
        const defaultTime = "11:59:59 PM";
        const bestGuestText = Object.keys(bestGuest).length === 0 || bestGuest.Present === defaultTime ? "La soirée n'a pas encore commencé" 
        : `Meilleur invité: ${bestGuest.Names} arrivé à ${bestGuest.Present}`;
        return (
            <div>
                    <div>
                        <SearchBar onWordEntered={this.onWordEntered} />
                    </div>
                    <div className="ui container bestGuest" style={{width: "50%", textAlign: "center"}}>
                        <div className="ui blue segment" >
                           <h5>{bestGuestText}</h5> 
                        </div>
                    </div>
                    <div className="ui tables" >
                    {!isFetchingGuests && !isFetchingTables ? (
                        <TableList 
                            guests={this.state.guestsToDisplay} 
                            tables={this.state.tablesToDisplay} 
                            onGuestSelected={this.onGuestSelected}
                        />
                        ) : (
                            <div className="ui active inverted dimmer">
                                <div className="ui large text loader">Téléchargement des invités</div>
                            </div>
                     )}
                    </div>
                    <div className="ui segment">
                    {!isFetchingGuests && !isFetchingTables ? (
                        <GuestView 
                            guest={this.state.selectectedGuest} 
                            onArrivalCheck={this.onArrivalCheck} 
                        />
                        ) : <div></div> }
                    </div> 
                    
            </div>
        );
    }
}

export default App;