import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { 
  BoldIcon, 
  ItalicIcon, 
  LinkIcon, 
  ImageIcon, 
  CodeIcon, 
  QuoteIcon,
  ListIcon,
  ListOrderedIcon 
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [textareaRef, setTextareaRef] = useState<HTMLTextAreaElement | null>(null);

  const insertText = (before: string, after: string = "") => {
    if (!textareaRef) return;

    const start = textareaRef.selectionStart;
    const end = textareaRef.selectionEnd;
    const selectedText = value.substring(start, end);
    
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);
    onChange(newText);

    // Reset cursor position
    setTimeout(() => {
      if (textareaRef) {
        textareaRef.focus();
        textareaRef.setSelectionRange(start + before.length, start + before.length + selectedText.length);
      }
    }, 0);
  };

  const formatBold = () => insertText("**", "**");
  const formatItalic = () => insertText("*", "*");
  const formatCode = () => insertText("`", "`");
  const formatQuote = () => insertText("\n> ", "");
  const formatList = () => insertText("\n- ", "");
  const formatOrderedList = () => insertText("\n1. ", "");
  
  const insertLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      insertText(`[Link text](${url})`);
    }
  };

  const insertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      insertText(`![Alt text](${url})`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Formatting Toolbar */}
      <div className="flex items-center space-x-2 py-4 border-t border-b border-gray-200 flex-wrap gap-2">
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={formatBold}
          className="hover:bg-gray-100"
          data-testid="button-format-bold"
        >
          <BoldIcon className="w-4 h-4" />
        </Button>
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={formatItalic}
          className="hover:bg-gray-100"
          data-testid="button-format-italic"
        >
          <ItalicIcon className="w-4 h-4" />
        </Button>
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={insertLink}
          className="hover:bg-gray-100"
          data-testid="button-insert-link"
        >
          <LinkIcon className="w-4 h-4" />
        </Button>
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={insertImage}
          className="hover:bg-gray-100"
          data-testid="button-insert-image"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={formatCode}
          className="hover:bg-gray-100"
          data-testid="button-format-code"
        >
          <CodeIcon className="w-4 h-4" />
        </Button>
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={formatQuote}
          className="hover:bg-gray-100"
          data-testid="button-format-quote"
        >
          <QuoteIcon className="w-4 h-4" />
        </Button>
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={formatList}
          className="hover:bg-gray-100"
          data-testid="button-format-list"
        >
          <ListIcon className="w-4 h-4" />
        </Button>
        <Button 
          type="button"
          variant="ghost" 
          size="sm" 
          onClick={formatOrderedList}
          className="hover:bg-gray-100"
          data-testid="button-format-ordered-list"
        >
          <ListOrderedIcon className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Content Editor */}
      <div className="relative">
        <Textarea
          ref={setTextareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-96 text-lg border-gray-200 focus-visible:ring-2 focus-visible:ring-medium-green resize-none"
          data-testid="textarea-rich-editor"
        />
        
        {/* Helper Text */}
        <div className="absolute bottom-4 right-4 text-sm text-gray-400 bg-white px-2 py-1 rounded">
          Markdown supported
        </div>
      </div>
    </div>
  );
}
