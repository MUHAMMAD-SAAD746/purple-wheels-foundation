import { useEffect } from "react";
import { useEditor, useEditorState, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import {
    FaBold,
    FaItalic,
    FaUnderline,
    FaListUl,
    FaListOl,
} from "react-icons/fa";

import "./RichTextEditor.css";


const RichTextEditor = ({ value, onChange }) => {

    const editor = useEditor({
        immediatelyRender: false,
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



    useEffect(() => {
        if (!editor) return;

        const currentContent = editor.getHTML();
        const newContent = value || "";

        if (currentContent !== newContent) {
            editor.commands.setContent(newContent, {
                emitUpdate: false,
            });
        }
    }, [editor, value]);




    const editorState = useEditorState({
        editor,
        selector: ({ editor }) => ({
            characterCount:
                editor?.storage.characterCount.characters() ?? 0,

            heading: editor?.isActive("heading", { level: 1 })
                ? "1"
                : editor?.isActive("heading", { level: 2 })
                    ? "2"
                    : editor?.isActive("heading", { level: 3 })
                        ? "3"
                        : editor?.isActive("heading", { level: 4 })
                            ? "4"
                            : "",
        }),
    });


    if (!editor) return null;

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
                        value={editorState?.heading ?? ""}
                        onChange={(e) => {
                            const level = e.target.value;

                            if (level === "") {
                                editor.chain().focus().setParagraph().run();
                            } else {
                                editor
                                    .chain()
                                    .focus()
                                    .setHeading({ level: Number(level) })
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
                {(editorState?.characterCount ?? 0).toLocaleString()}/10,000 characters
            </p>
        </>
    );
};

export default RichTextEditor;