import React from 'react';

class SearchBar extends React.Component {

    state = {searchWord: ""};

    onFormSubmit = (event) => {
        event.preventDefault();
    }

    onWordTyped = (event) => {
        this.setState({searchWord: event.target.value});
        this.props.onWordEntered(event.target.value);
    }

    render() {
        return (
            <div className="ui center aligned container" >
                <form onSubmit={this.onFormSubmit} className="ui form" style={{margin:"20px"}}>
                    <div className="field">
                        <div className="ui left icon input" >
                            <input 
                                type="text" 
                                placeholder="Chercher un invité..."
                                value={this.state.searchWord}
                                onChange={this.onWordTyped}
                            />
                            <i className="users icon"></i>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default SearchBar;