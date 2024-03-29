import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';

import Browserbar from './Browserbar'
import Webviews from './Webviews'
import Webview from './Webview'

class Browser extends Component {
  constructor(props){
    super(props)
    this.state = {
      tabs:[],
      url: ''
    }
  }
  handleIconAvailable = (tab, icon) => {
    if(tab.id === 'wallet') return
    this.setState(prevState => {
      let tabs = [...prevState.tabs] // copy tabs state
      let tabIdx = tabs.findIndex(t => (t.id === tab.id)) // find changed item
      let tabM = {
        ...tabs[tabIdx], // create copy of changed item
        icon: icon // & modify copy
      } 
      tabs[tabIdx] = tabM // write changes to new tabs state
      return {
        tabs: tabs 
      }
    })
  }  
  handleTitleAvailable = (tab, title) => {
    this.setState(prevState => {
      let tabs = [...prevState.tabs] // copy tabs state
      let tabIdx = tabs.findIndex(t => (t.id === tab.id)) // find changed item
      let tabM = {
        ...tabs[tabIdx], // create copy of changed item
        name: title // & modify copy
      } 
      tabs[tabIdx] = tabM // write changes to new tabs state
      return {
        tabs: tabs 
      }
    })
  }
  handleNavigate = (url) => {
    this.setState({
      url
    })
  }
  handleReload = () => {

  }
  render(){
    let tabs = this.props.tabs
    let accounts = []
    let selectedTab = (tabs && tabs.length > 0) ? tabs[0] : undefined
    let tabUrl = selectedTab && selectedTab.url
    let urlParam = this.props.match.params.url ? decodeURIComponent(this.props.match.params.url) : ''
    let url = this.state.url || urlParam || tabUrl || 'https://github.com/ethereum/mist-ui-react'

    let settings =  this.props.settings

    return (
      <Fragment>
        <Browserbar 
          url={url}
          dappAccounts = {accounts}
          selectedTab={selectedTab}
          onUrlChanged={this.handleNavigate}
          onReload={this.handleReload}
        />
        {url
        ?
        <main>
          <Webview 
            key={'_browser_'} 
            url={url} 
            visible={true}
            onIconAvailable={(icon) => {}}
            onTitleAvailable={(title) => {}}
            onNavigate={this.handleNavigate}
            userSettings={settings}
          />
        </main>
       :
        <Webviews 
          tabs={tabs} 
          selectedTab={selectedTab}
          onIconAvailable={this.handleIconAvailable}
          onTitleAvailable={this.handleTitleAvailable}
        />
        }  
      </Fragment>

    )
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    settings: state.settings.browser
  };
}

export default connect(mapStateToProps)(Browser)
