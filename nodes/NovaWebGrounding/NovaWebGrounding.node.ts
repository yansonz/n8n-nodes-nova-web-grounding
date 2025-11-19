import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';

export class NovaWebGrounding implements INodeType {
	description: INodeTypeDescription = require('./NovaWebGrounding.node.json');

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		for (let i = 0; i < items.length; i++) {
			const credentials = await this.getCredentials('aws', i);
			const modelId = this.getNodeParameter('modelId', i) as string;
			const query = this.getNodeParameter('query', i) as string;

			const client = new BedrockRuntimeClient({
				region: credentials.region as string,
				credentials: {
					accessKeyId: credentials.accessKeyId as string,
					secretAccessKey: credentials.secretAccessKey as string,
				},
			});

			const command = new ConverseCommand({
				modelId,
				messages: [
					{
						role: 'user',
						content: [{ text: query }],
					},
				],
				toolConfig: {
					tools: [
						{
							systemTool: {
								name: 'nova_grounding',
							},
						},
					],
				},
			});

			try {
				const response = await client.send(command);
				
				// Extract full response content
				let fullResponse = '';
				if (response.output?.message?.content) {
					for (const content of response.output.message.content) {
						if (content.text) {
							fullResponse += content.text;
						}
					}
				}
				
				items[i].json = {
					query,
					response: fullResponse || 'No response received',
					fullOutput: response.output,
					usage: response.usage,
				};
			} catch (error: any) {
				items[i].json = {
					query,
					error: error.message,
				};
			}
		}

		return [items];
	}
}