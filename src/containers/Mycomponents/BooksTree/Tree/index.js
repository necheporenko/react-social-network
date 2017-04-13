import React, { Component } from 'react';
import { gData } from './util';
import Tree, {TreeNode} from 'draggable-react-tree-component';

import './index.scss';
import './draggable.scss';

class Demo extends Component {
  constructor(props) {
    super(props);
    [
      'onDragStart',
      'onDragEnter',
      'onDrop',
      'onExpand'
    ].forEach((name) => (this[name] = this[name].bind(this)));

    this.state = {
      gData,
      autoExpandParent: true,  //??????
      expandedKeys: ['0-0']
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
    }
    else {
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
    if (item.no_drag && item.icon == 'book') {
      return 'not_drag icon_book';
    }
    if (item.icon == 'secret') {
      return 'icon_secret';
    }
    if (item.icon == 'book') {
      return 'icon_book';
    }
    if (item.icon == 'bin') {
      return 'icon_bin';
    }

    return null;
  }


  render() {
    const loop = data => (
      data.map((item) =>
        (<TreeNode
          key={item.key}
          items={(item.children && item.children.length) ? loop(item.children) : null}
          //no_drag = {item.no_drag ? draggable={false} : null}
          //className={item.show ? 'not_show' : null}
          className={this.onPick(item)}
          disabled={item.no_drag ? true : false}
        >
          <a href={`#/${item.key}`} draggable={false}>
            {item.title}
          </a>
        </TreeNode>)
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
          defaultExpandedKeys={['0-0']}
          //defaultExpandAll={this.defaultExpandAll} //new
        >
          {loop(this.state.gData)}
        </Tree>
      </div>
    </div>);
  }
}

export default Demo;
