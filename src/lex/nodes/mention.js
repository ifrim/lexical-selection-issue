import { DecoratorNode } from 'lexical';

export class MentionNode extends DecoratorNode {
	__nodeName;

	static getType() {
		return 'mention';
	}

	static clone(node) {
		return new MentionNode(node.__nodeName, node.__key);
	}

	static importJSON(serializedNode) {
		const node = $createMentionNode(serializedNode.nodeName);
		node.__nodeName = serializedNode.nodeName;
		return node;
	}

	constructor(name, key) {
		super(key);
		this.__nodeName = name;
	}

	createDOM() {
		let dom = document.createElement('span');
		dom.classList.add('mention-node');
		let text = document.createTextNode(this.getTextContent());
		dom.append(text);
		return dom;
	}

	getTextContent() {
		return `@${this.__nodeName}`;
	}

	updateDOM() {
		return false;
	}

	decorate() {
		return '';
	}

	exportJSON() {
		return {
			type: 'mention',
			nodeName: this.__nodeName,
		};
	}

	isIsolated() {
		return true;
	}

	isInline() {
		return true;
	}
}

export function $createMentionNode(name) {
	return new MentionNode(name);
}

export function $isMentionNode(node) {
	return node instanceof MentionNode;
}