export async function deletePost(postId: string) {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
  }
  