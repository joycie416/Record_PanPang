import { Comment } from '@/type/comment'
import { supabase } from '@/utils/supabase/supabaseClient'
import React from 'react'

const CommentForm = ({comment}: {comments:Comment}) => {

    const handleDelete = async()=>{
        const {error} = await supabase
        .form('comments')
        .delete()
        .eq('comment_id', comments.)
    }

  return (
    <div>CommentForm</div>
  )
}

export default CommentForm