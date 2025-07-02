
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Bold, Italic, List, ListOrdered, Heading1, Heading2, Table, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const [cursorPosition, setCursorPosition] = useState(0);

  const insertText = (beforeText: string, afterText: string = '', sampleText: string = '') => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const textToInsert = selectedText || sampleText;
    
    const newValue = 
      value.substring(0, start) + 
      beforeText + textToInsert + afterText + 
      value.substring(end);
    
    onChange(newValue);
    
    // Set cursor position after insertion
    setTimeout(() => {
      const newCursorPos = start + beforeText.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  const insertHeading = (level: number) => {
    const headingPrefix = '#'.repeat(level) + ' ';
    insertText('\n' + headingPrefix, '\n', `Heading ${level}`);
  };

  const insertList = (ordered: boolean = false) => {
    const listItem = ordered ? '1. ' : '- ';
    insertText('\n' + listItem, '\n', 'List item');
  };

  const insertTable = () => {
    const tableTemplate = `
| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
`;
    insertText('\n' + tableTemplate + '\n');
  };

  const formatSelectedText = (prefix: string, suffix: string = prefix) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    if (selectedText) {
      const newValue = 
        value.substring(0, start) + 
        prefix + selectedText + suffix + 
        value.substring(end);
      onChange(newValue);
    }
  };

  const renderPreview = () => {
    const lines = value.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-3xl font-bold mt-6 mb-4">{line.slice(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-2xl font-bold mt-5 mb-3">{line.slice(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-xl font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
      } else if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 list-disc">{line.slice(2)}</li>;
      } else if (line.match(/^\d+\. /)) {
        return <li key={index} className="ml-4 list-decimal">{line.replace(/^\d+\. /, '')}</li>;
      } else if (line.startsWith('|') && line.endsWith('|')) {
        const cells = line.split('|').slice(1, -1);
        return (
          <tr key={index}>
            {cells.map((cell, cellIndex) => (
              <td key={cellIndex} className="border border-gray-300 px-2 py-1">{cell.trim()}</td>
            ))}
          </tr>
        );
      } else if (line.trim() === '') {
        return <br key={index} />;
      } else {
        return <p key={index} className="mb-2">{line}</p>;
      }
    });
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="space-y-4">
          {/* Formatting Toolbar */}
          <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/30">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertHeading(1)}
              title="Heading 1"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertHeading(2)}
              title="Heading 2"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => formatSelectedText('**')}
              title="Bold"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => formatSelectedText('*')}
              title="Italic"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertList(false)}
              title="Bullet List"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => insertList(true)}
              title="Numbered List"
            >
              <ListOrdered className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={insertTable}
              title="Insert Table"
            >
              <Table className="h-4 w-4" />
            </Button>
          </div>

          {/* Text Editor */}
          <Textarea
            id="content-editor"
            placeholder={placeholder || "Write your content here... Use the toolbar above for formatting."}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setCursorPosition(e.target.selectionStart);
            }}
            rows={20}
            className="font-mono text-sm"
          />

          {/* Formatting Help */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Formatting Guide</CardTitle>
            </CardHeader>
            <CardContent className="text-xs space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Badge variant="outline" className="mb-1">Headings</Badge>
                  <p># Heading 1</p>
                  <p>## Heading 2</p>
                  <p>### Heading 3</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-1">Text Format</Badge>
                  <p>**Bold text**</p>
                  <p>*Italic text*</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-1">Lists</Badge>
                  <p>- Bullet point</p>
                  <p>1. Numbered list</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-1">Tables</Badge>
                  <p>| Col1 | Col2 |</p>
                  <p>|------|------|</p>
                  <p>| Data | Data |</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                {value ? (
                  <div>{renderPreview()}</div>
                ) : (
                  <p className="text-muted-foreground">Start writing to see the preview...</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
