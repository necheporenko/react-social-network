import React, {Component} from 'react';

export default class HumanCard extends Component {
  render() {
    return(
      <div>
        {box.id &&
          <div style={{display: 'flex'}} className="wrapper-human-card">
            <div className="human-card human-card-preview">
              {box.human_card
                ? <div className="markdown-human-card">
                  {/*<Link to={`/${slug}/documents/human-card/${box.human_card.public_address}`} className="markdown-human-card">*/}
                  {this.requestHumanCard(box.human_card.url)}
                  <ReactMarkdown source={this.state.markdownText}>
                    {/*{this.CopyToClipboard()}*/}
                  </ReactMarkdown>
                  {/*</Link>*/}
                </div>
                : <div>
                  {/*<div className="help-human-card"><i/></div>*/}
                  <h1 style={{marginBottom: 0}}>HUMAN CARD</h1>
                  {/*<hr/>*/}
                  <p style={{marginTop: '5px', marginBottom: 0}}>
                    {/*<strong>Public Address:</strong>*/}
                    <input
                      type="text" placeholder="Paste your public address here"
                      onChange={this.changePublicAddress}
                      value={this.state.publicAddress || (box.draft_human_card && box.draft_human_card.public_address) || ''}
                      ref={el => this.inputPublicAddress = el}
                      style={{fontSize: '13px'}}
                  />
                    {/*<div className="help-human-card"><i/></div>*/}
                  </p>
                  <p style={{fontSize: '12px', marginTop: '5px', marginBottom: '10px'}}>
                  This public address has been established for:
                </p>
                  <p style={{marginTop: '10px'}}>
                    <input
                      type="text" placeholder="Paste your getAddress here"
                      onChange={this.changeFullName}
                      value={this.state.fullName || (box.draft_human_card && box.draft_human_card.full_name) || fullName}
                      ref={el => this.inputFullName = el}
                      style={{fontSize: '22px'}}
                  />
                    {/*<div className="help-human-card"><i/></div>*/}
                  </p>
                  <p style={{color: '#d2d2d2', fontSize: '13px'}}>
                  Digital signature and signing date will be here.
                  {/*<span>  your signature will be here</span>*/}
                    {/*<div className="help-human-card"><i/></div>*/}
                  </p>
                </div>
              }
            </div>

            {!box.human_card &&
              <div className="human-card-btn">
                <button className="btn-brand" onClick={this.saveDraft}>Save</button>
                <SignHumanCard
                  fullName={this.state.fullName || (box.draft_human_card && box.draft_human_card.full_name) || fullName}
                  publicAddress={this.state.publicAddress || (box.draft_human_card && box.draft_human_card.public_address) || ''}
                />
              </div>
            }
          </div>
        }
      </div>
    ); 
  }
}