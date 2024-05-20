import React from 'react';
import { Bold, Strikethrough, Italic, List, ListOrdered, Heading2, Underline, Quote, Undo, Redo, Code,Link } from 'lucide-react';

const Toolbar = ({ editor,content }) => {
    if (!editor) {
        return null;
    }

    return (
        <div className='px-4 py-3 rounded-tl-md rounded-tr-md flex justify-between items-start gap-5 w-full flex-wrap border border-gray-700'>
            <div className='flex flex-wrap justify-start items-center lg:gap-5 gap-2 w-full lg:w-10/12'>
                <button onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleBold().run();
                }} className={editor.isActive("bold") ? "bg-sky-700 text-white p-1 rounded-md" : "text-sky-700"}>
                    <Bold className='lg:w-5 w-3 h-3 lg:h-5' />
                </button>

                <button onClick={(e) => {
                    e.preventDefault();
                    editor.chain().focus().toggleItalic().run();
                }} className={editor.isActive("italic") ? "bg-sky-700 text-white p-1 rounded-md" : "text-sky-700"}>
                    <Italic className='lg:w-5 w-3 h-3 lg:h-5' />
                </button>
                <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-700"
          }
        >
          <Underline className='lg:w-5 w-3 h-3 lg:h-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-700"
          }
        >
          <Strikethrough className='lg:w-5 w-3 h-3 lg:h-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-700"
          }
        >
          <Heading2 className='lg:w-5 w-3 h-3 lg:h-5' />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBulletList().run();
          }}
          className={
            editor.isActive("bulletList")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-700"
          }
        >
          <List className='lg:w-5 w-3 h-3 lg:h-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleOrderedList().run();
          }}
          className={
            editor.isActive("orderedList")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-700"
          }
        >
          <ListOrdered className='lg:w-5 w-3 h-3 lg:h-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBlockquote().run();
          }}
          className={
            editor.isActive("blockquote")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-700"
          }
        >
          <Quote className='lg:w-5 w-3 h-3 lg:h-5' />
        </button>
       
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().setCode().run();
          }}
          className={
            editor.isActive("code")
              ? "bg-sky-700 text-white p-2 rounded-lg"
              : "text-sky-700 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Code className='lg:w-5 w-3 h-3 lg:h-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().undo().run();
          }}
          className={
            editor.isActive("undo")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-700 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Undo className='lg:w-5 w-3 h-3 lg:h-5' />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().redo().run();
          }}
          className={
            editor.isActive("redo")
              ? "bg-sky-700 text-white p-1 rounded-lg"
              : "text-sky-700 hover:bg-sky-700 hover:text-white p-1 hover:rounded-lg"
          }
        >
          <Redo className='lg:w-5 w-3 h-3 lg:h-5' />
        </button>
        {/* <button onClick={(e) => {
                    e.preventDefault();
                    const url = window.prompt("Enter the URL:");
                    if (!url) return;
                    editor.chain().focus().toggleLink({ href: url }).run();
                }} className={editor.isActive("link") ? "bg-sky-700 text-white p-1 rounded-md" : "text-sky-700"}>
                    <Link className='lg:w-5 w-3 h-3 lg:h-5' />
                </button> */}
            </div>
            {/* {content} */}
        </div>
    );
}

export default Toolbar;