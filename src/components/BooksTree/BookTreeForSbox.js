import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Tree, { TreeNode } from 'draggable-react-tree-component';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import { load as loadBookTree, show as showBookStories, getCheckboxOfBook } from '../../redux/modules/book';
import { gData } from './util';
import './draggable.scss';

const arrCheckbox = [];

@asyncConnect([{
  promise: ({ store: { dispatch, getState } }) => {
    const promises = [];
    return Promise.all(promises);
  }
}])

@connect((state) => ({
  bookTreeArr: state.book.bookTreeArr,
  requestedUserSlug: state.sign.requestedUser.slug,
  authorizedUserSlug: state.sign.authorizedUser.slug,
}), {
  loadBookTree,
  showBookStories,
  getCheckboxOfBook
})

class BooksTreeForSbox extends Component {
  constructor(props) {
    super(props);
    [
      'onDragStart',
      'onDragEnter',
      'onDrop',
      'onExpand',
    ].forEach((name) => (this[name] = this[name].bind(this)));

    this.state = {
      // gData: this.props.bookTreeArr,
      gData,
      autoExpandParent: true,  //??????
      expandedKeys: ['root']
    };
  }

  onDragStart(info) {
    console.log('start', info); // eslint-disable-line no-console
  }
  onDragEnter(info) {
    // console.log('enter', info)
    this.setState({
      expandedKeys: info.expandedKeys,
    });
  }
  onDrop(info) {
    console.log('drop', info); // eslint-disable-line no-console

    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;

    // traverse to the hiven key and execute the given callback

    const traverseToKey = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return traverseToKey(item.children, key, callback);
        }
        return null;
      });
    };

    const data = [...this.state.gData];
    let dragObj;

    traverseToKey(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (info.dropToGap) {
      traverseToKey(data, dropKey, (item) => {
        item.children = item.children || [];

        let index = info.dropPosition +
          (info.dropPositionOnNode > 0 ? 1 : 0);

        if (info.isSameLevel && info.dragPosition < info.dropPosition) {
          index -= 1;
        }
        // where to insert
        item.children.splice(index, 0, dragObj);
      });
    } else {
      traverseToKey(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.push(dragObj);                                //       TYT
      });
    }

    this.setState({
      gData: data,
      expandedKeys: info.rawExpandedKeys.concat([dropKey]),
    });
  }
  onExpand(expandedKeys) {
    this.setState({
      expandedKeys,
      autoExpandParent: false,    //??/false
    });
  }

  onPick(item) {
    if (item.show) {
      return 'not_show';
    }
    if (item.no_drag && item.icon === 'book') {
      return 'not_drag icon_book';
    }
    if (item.icon === 'secret') {
      return 'icon_secret';
    }
    if (item.icon === 'book') {
      return 'icon_book';
    }
    if (item.icon === 'bin') {
      return 'icon_bin';
    }
    return null;
  }

  checked(key) {
    const find = arrCheckbox.indexOf(key);
    if (find !== -1) {
      arrCheckbox.splice(find, 1);
    } else {
      arrCheckbox.push(key);
    }
    this.props.getCheckboxOfBook(arrCheckbox);
  }


  render() {
    const slug = this.props.requestedUserSlug || this.props.authorizedUserSlug;
    const loop = data => (
      data.map((item) => {
        return (
          <TreeNode
            key={item.key}
            items={(item.children && item.children.length) ? loop(item.children) : null}
            className={this.onPick(item)}
            disabled={item.no_drag}
          >
            <input type="checkbox" id={item.key} value={item.key} onChange={(e) => this.checked(e.target.value)} />
            <label htmlFor={item.key}><span></span></label>
            <Link
              to={`/${slug}/books/${item.key}`}
              draggable={false}
            >
              {item.name}
            </Link>
          </TreeNode>);
      }
      )
    );
    return (
      <div className="draggable-demo">
        <div className="draggable-container">
          <Tree
            expandedKeys={this.state.expandedKeys}
            onExpand={this.onExpand} autoExpandParent={this.state.autoExpandParent}
            draggable
            onDragStart={this.onDragStart}
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
            droppedNodeClassNameDelay={2400}
            defaultExpandAll={false}
            defaultExpandedKeys={['root']}
            //defaultExpandAll={this.defaultExpandAll} //new
          >
            {loop(this.props.bookTreeArr)}
          </Tree>
        </div>
      </div>
    );
  }
}

export default BooksTreeForSbox;

BooksTreeForSbox.propTypes = {
  bookTreeArr: PropTypes.object,
  loadBookTree: PropTypes.func,
};
