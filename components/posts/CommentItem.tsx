import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { formatDistanceToNowStrict } from 'date-fns';

import Avatar from '../Avatar';

interface CommentItemProps {
  data: Record<string, any>;
  onDelete: () => void;
  userId: string;
}

const CommentItem: React.FC<CommentItemProps> = ({ data = {}, onDelete, userId }) => {
  const router = useRouter();

  const goToUser = useCallback((ev: any) => {
    ev.stopPropagation();

    router.push(`/users/${data.user.id}`)
  }, [router, data.user.id]);

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt])

  const handleDelete = useCallback(async () => {
    console.log("hi");
    try {
      console.log("hi2");
      const res = await fetch(`/api/comments/${data.user.postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("hi3");
      if (res.status === 204) {
        onDelete();
      } else {
        console.error('Failed to delete comment:', res.status);
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  }, [data.user.postId, onDelete]);

  const canDeleteComment = useMemo(() => {
    return data.userId === userId || data.postId.userId === userId;
  }, [data, userId]);

  return (
    <div 
      className="
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      ">
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p 
              onClick={goToUser} 
              className="
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            ">
              {data.user.name}
            </p>
            <span 
              onClick={goToUser} 
              className="
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            ">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">
              {createdAt}
            </span>
            {canDeleteComment && (
              <button 
                onClick={handleDelete} 
                className="
                  ml-auto
                  text-neutral-500 
                  hover:text-white 
                  transition
                ">
                Delete
              </button>
            )}
          </div>
          <div className="text-white mt-1">
            {data.body}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem;
