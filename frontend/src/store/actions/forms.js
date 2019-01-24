export const OPEN_POST_FORM = 'OPEN_POST_FORM';
export const CLOSE_POST_FORM = 'CLOSE_POST_FORM';

export const OPEN_COMMENT_FORM = 'OPEN_COMMENT_FORM';
export const CLOSE_COMMENT_FORM = 'CLOSE_COMMENT_FORM';

export function openPostForm(createCategory, editPost) {
  return {
    type: OPEN_POST_FORM,
    category: createCategory,
    post: editPost,
  };
}

export function closePostForm() {
  return {
    type: CLOSE_POST_FORM,
  };
}

export function openCommentForm(parentId, editComment) {
  return {
    type: OPEN_COMMENT_FORM,
    parentId: parentId,
    comment: editComment,
  };
}

export function closeCommentForm() {
  return {
    type: CLOSE_COMMENT_FORM,
  };
}
