import './PostList.css';
import React from 'react';
import { connect } from 'react-redux';
import { getCategories, getPosts, getLoadingState } from '../store';
import { fetchPosts } from '../store/actions/posts';
import { fetchCategories } from '../store/actions/categories';
import { openPostForm } from '../store/actions/forms';
import LoadingPage from './Loading';
import NotFoundPage from './NotFound';
import InternalErrorPage from './InternalError';
import PostList from '../components/PostList';
import PostFilterMenu from '../components/PostFilterMenu';
import InternalErrorMessage from '../components/InternalErrorMessage';
import { SortType } from '../constants';

function mapStateToProps(state, props) {
  const category = props.match.params.categoryId || 'all';
  const loadingState = getLoadingState(state);

  return {
    category: category,
    posts: getPosts(state, category),
    allCategories: getCategories(state),

    isLoadingPosts: loadingState.posts.loading,
    failedToLoadPosts: loadingState.posts.failed,

    isLoadingCategories: loadingState.categories.loading,
    failedToLoadCategories: loadingState.categories.failed,
  };
}

class PostListPage extends React.Component {
  state = {
    sortType: SortType.Newer,
    searchText: '',
  }

  componentDidMount = () => {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPosts(this.props.category));
  }

  componentDidUpdate = (prevProps) => {
    const newCategoryId = this.props.match.params.categoryId;

    if (newCategoryId !== prevProps.match.params.categoryId) {
      this.props.dispatch(fetchPosts(newCategoryId || 'all'));
    }
  }

  onCategoryChange = (category) => {
    this.setState({ searchText: '' });

    // This will trigger componentDidUpdate, which will refresh the post list, if necessary
    this.props.history.push(category === 'all' ? '/' : `/${category}`);
  }

  onSortTypeChange = (sortType) => {
    this.setState({ sortType });
  }

  onSearchTextChange = (searchText) => {
    this.setState({ searchText });
  }

  openPostForm = () => {
    this.props.dispatch(openPostForm(this.props.category, null));
  }

  sortPosts = (posts) => {
    switch (this.state.sortType) {
      case SortType.Newer: {
        return posts.slice(0).sort((a, b) => b.timestamp - a.timestamp);
      }

      case SortType.Older: {
        return posts.slice(0).sort((a, b) => a.timestamp - b.timestamp);
      }

      case SortType.HigherScore: {
        return posts.slice(0).sort((a, b) => b.voteScore - a.voteScore);
      }

      case SortType.LowerScore: {
        return posts.slice(0).sort((a, b) => a.voteScore - b.voteScore);
      }

      default: {
        return posts;
      }
    }
  }

  render = () => {
    const { searchText, sortType } = this.state;
    const {
      category,
      allCategories, posts,
      isLoadingCategories, isLoadingPosts,
      failedToLoadCategories, failedToLoadPosts,
    } = this.props;

    const searchRe = searchText ? new RegExp(searchText, 'i') : null;

    const postList = !searchRe
      ? this.sortPosts(posts)
      : this.sortPosts(posts).filter(post => searchRe.test(post.title));

    const hasPostsToDisplay =
      !failedToLoadPosts &&
      (!isLoadingPosts || postList.length > 0);
    const hasCategoriesToDisplay =
      !failedToLoadCategories &&
      (!isLoadingCategories || allCategories.length > 0);

    const categoryOptions = [
      { value: 'all', label: 'all' },
      ...allCategories.map((category) => ({
        value: category.id,
        label: category.name,
      })),
    ];

    const sortTypeOptions = [
      { value: SortType.Newer, label: 'newer' },
      { value: SortType.Older, label: 'older' },
      { value: SortType.HigherScore, label: 'higher score' },
      { value: SortType.LowerScore, label: 'lower score' },
    ];

    return (
      category !== 'all' &&
      hasCategoriesToDisplay &&
      !allCategories.find(c => c.id === category)
    ) ? (
      <NotFoundPage />
    ) : (
      <div className='page-container PostListPage'>
        {hasCategoriesToDisplay && (
          <div className='PostListPage__Head'>
            <PostFilterMenu
              className='PostListPage__FilterMenu'
              currentCategory={category}
              currentSearchText={searchText}
              currentSortType={sortType}
              categoryOptions={categoryOptions}
              sortTypeOptions={sortTypeOptions}
              onCategoryChange={this.onCategoryChange}
              onSortTypeChange={this.onSortTypeChange}
              onSearchTextChange={this.onSearchTextChange}
            />
            <button type='button'
              className='underlined-button PostListPage__CreatePostButton'
              onClick={this.openPostForm}
            >
              Write a post
            </button>
          </div>
        )}

        <div className='PostListPage__PostList'>
          {/* NOTE: Should not try to render the posts if while the categories are loading */}
          {failedToLoadCategories ? (
            <InternalErrorPage />
          ) : failedToLoadPosts ? (
            <InternalErrorMessage />
          ) : !hasPostsToDisplay || !hasCategoriesToDisplay ? (
            <LoadingPage />
          ) : (
            <PostList posts={postList} categories={allCategories} />
          )}
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(PostListPage);
