import React from 'react';
import { Form, Input } from 'formsy-react-components';
import { Link } from 'react-router';
import './index.scss';

const ListMessage = () => {
  return (
    <div className="messages-mnu">
      <div className="additional-title">Messanger
          <Link to="/messages/new" className="new-message"><i></i></Link>
      </div>
      <ul className="conversations-list">
        <Form
          rowClassName={[{'form-group': false}, {row: false}, 'messages-form']}
        >
          <Input
            name="to"
            value=""
            labelClassName={[{'col-sm-3': false}, 'disabled-label']}
            elementWrapperClassName={[{'col-sm-9': false}, 'messages-search']}
            type="text"
            placeholder="Search"
          />
        </Form>
        <li>No conversations yet.</li>
        {/*<Link to="/messages">*/}
          <li>
            <a href="#">
              <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
              <h5>Name Surname</h5>
            </a>
            <p>Message text...</p>
          </li>
        {/*</Link>*/}

        <li>
          <a href="#">
            <img src="http://devianmbanks.validbook.org/cdn/120x120.png?t=1489675034" alt=""/>
            <h5>Name Surname</h5>
          </a>
          <p>Message text...</p>
        </li>
      </ul>
    </div>
  );
};

export default ListMessage;
