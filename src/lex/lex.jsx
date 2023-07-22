import { useEffect, useRef } from 'react';
import { createEditor, $getRoot, $createParagraphNode, $createTextNode } from 'lexical';
import { registerPlainText } from '@lexical/plain-text';

import './lex.css';
import { MentionNode, $createMentionNode } from './nodes/mention';

function Lex({ value }) {
	let editorRef = useRef();
	let lexRef = useRef();

	useEffect(() => {
		if (editorRef.current) return;

		editorRef.current = createEditor({
			namespace: 'Lex',
			onError: console.error,
			nodes: [MentionNode]
		});

		registerPlainText(editorRef.current);

		editorRef.current.setRootElement(lexRef.current);

		editorRef.current.update(() => {
			let p = $createParagraphNode();

			if (Array.isArray(value)) {
				p.append(...value.map(({ type, value }) => {
					if (type === 'text') return $createTextNode(value);
					if (type === 'mention') return $createMentionNode(value);
				}));
			}

			$getRoot().append(p);
		});
	}, [value]);

	return (
    <div
      className="lex" ref={lexRef}
      contentEditable
    />
	);
}

export default Lex;