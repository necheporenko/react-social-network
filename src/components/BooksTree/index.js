import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Tree, {TreeNode} from 'draggable-react-tree-component';
import {connect} from 'react-redux';
import {
  load as loadBookTree,
  show as showBookStories,
  move as moveBook,
  clearBookStories,
  showSubBooksCurrentBook,
  getBooks
} from '../../redux/modules/book';
import {clearStories} from '../../redux/modules/story';
import {gData} from './util';
import './draggable.scss';

@connect((state) => ({
  // bookTreeArr: state.book.bookTreeArr,
  requestedUserSlug: state.user.requestedUser.slug,
  authorizedUserSlug: state.user.authorizedUser.slug,
  path: state.routing.locationBeforeTransitions.pathname,
}), {
  showBookStories,
  moveBook,
  clearBookStories,
  clearStories,
  showSubBooksCurrentBook,
  getBooks
})

class BooksTree extends Component {
  constructor(props) {
    super(props);
    [
      'onDragStart',
      'onDragEnter',
      'onDrop',
      'onExpand',
      'clearStream',
      'showSubBooks'
    ].forEach((name) => (this[name] = this[name].bind(this)));

    this.state = {
      gData: this.props.bookTreeArr,
      // gData,
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
    console.log('drop', info);
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
    let book_before_slug;

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
        const take_book = item.children[index - 1];
        if (take_book) {
          book_before_slug = take_book.key;
          console.log('PREV OR NEXT', take_book.key);
        } else {
          book_before_slug = '';
          console.log('PREV OR NEXT Error');
        }
      });
    } else {
      traverseToKey(data, dropKey, (item) => {
        item.children = item.children || [];
        // where to insert
        item.children.push(dragObj);                                //       TYT
        book_before_slug = '';
        console.log('children', item.children);
      });
    }

    this.setState({
      gData: data,
      expandedKeys: info.rawExpandedKeys.concat([dropKey]),
    });
    console.log('MOVE BOOK', dragKey, dropKey, book_before_slug);
    this.props.moveBook(dragKey, dropKey, book_before_slug);
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
    if (item.no_drag && item.icon === 'public') {
      return 'not_drag icon_book';
    }
    if (item.icon === 'private') {
      return 'icon_private';
    }
    if (item.icon === 'public') {
      return 'icon_public';
    }
    if (item.icon === 'bin') {
      return 'icon_bin';
    }
    return null;
  }

  clearStream() {
    this.props.clearBookStories();
    this.props.clearStories();
  }

  showSubBooks(e, slug, book_slug) {
    e.preventDefault();
    this.props.getBooks(slug, book_slug);
  }

  render() {
    const {path, isLink} = this.props;
    const slug = this.props.requestedUserSlug || this.props.authorizedUserSlug;
    const loop = data => (
      data.map((item) => {
        return (
          <TreeNode
            key={item.key}
            items={(item.children && item.children.length) ? loop(item.children) : null}
              //no_drag = {item.no_drag ? draggable={false} : null}
              //className={item.show ? 'not_show' : null}
            className={[[`${this.onPick(item)}`], [`${path}` === `${`/${slug}/books/${item.key}`}` ? 'active' : null]]}
            disabled={item.no_drag}
            >
            <Link
              to={`/${slug}/books/${item.key}`}
              draggable={false}
              onClick={e => isLink ? this.clearStream : this.showSubBooks(e, slug, item.key)}
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
            onExpand={this.onExpand}
            autoExpandParent={this.state.autoExpandParent}
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

BooksTree.propTypes = {
  bookTreeArr: PropTypes.array,
  moveBook: PropTypes.func,
  clearBookStories: PropTypes.func,
  clearStories: PropTypes.func,
};

BooksTree.defaultProps = {
  isLink: true
};

export default BooksTree;
