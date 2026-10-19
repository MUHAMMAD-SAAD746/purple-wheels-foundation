import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaListUl,
    FaListOl,
    FaHeading
} from "react-icons/fa";

import "./RichTextEditor.css";


const RichTextEditor = ({ value, onChange }) => {
    const [heading, setHeading] = useState("");

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            CharacterCount.configure({
                limit: 10000,
            }),
        ],
        content: value || "",
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        }
    });

    if (!editor) return null;

    const characterCount = editor.storage.characterCount.characters();

    return (
        <>
            <div className="rich-text-editor">
                <div className="rich-text-toolbar">
                    <button
                        type="button"
                        title="Bold"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                    >
                        <FaBold />
                    </button>

                    <button
                        type="button"
                        title="Italic"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                    >
                        <FaItalic />
                    </button>

                    <button
                        type="button"
                        title="Underline"
                        onClick={() => editor.chain().focus().toggleUnderline().run()}
                    >
                        <FaUnderline />
                    </button>

                    <select
                        title="Select heading"
                        value={heading}
                        onChange={(e) => {
                            const level = e.target.value;
                            setHeading(level);

                            if (level) {
                                editor
                                    .chain()
                                    .focus()
                                    .toggleHeading({ level: Number(level) })
                                    .run();
                            }
                        }}
                    >
                        <option value="">Paragraph</option>
                        <option value="1">Heading 1</option>
                        <option value="2">Heading 2</option>
                        <option value="3">Heading 3</option>
                        <option value="4">Heading 4</option>
                    </select>

                    <button
                        type="button"
                        title="Bullet list"
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                    >
                        <FaListUl />
                    </button>

                    <button
                        type="button"
                        title="Numbered list"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    >
                        <FaListOl />
                    </button>
                </div>

                <EditorContent
                    editor={editor}
                    className="rich-text-content"
                />
            </div>

            <p className="create-post-character-count">
                {characterCount.toLocaleString()}/10,000 characters
            </p>
        </>
    );
};

export default RichTextEditor;