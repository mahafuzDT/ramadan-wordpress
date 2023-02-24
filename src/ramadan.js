import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { bangladesh as BDCities } from './utils/cities';
import { __ } from '@wordpress/i18n';

const name = 'ramadan/ramadan';

function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'ramadan' ) }>
					<TextControl
						label={ __( 'Start Date', 'ramadan' ) }
						value={ attributes.date }
						type="date"
						onChange={ ( value ) =>
							setAttributes( { date: value } )
						}
					/>

					<SelectControl
						label={ __( 'City', 'ramadan' ) }
						value={ attributes.city }
						onChange={ ( value ) =>
							setAttributes( { city: value } )
						}
					>
						<option value="">
							{ __( '- Select -', 'ramadan' ) }
						</option>
						{ BDCities.map( ( division, di ) => (
							<optgroup key={ di } label={ division.label }>
								{ division.options.map( ( city, ci ) => (
									<option key={ ci } value={ city.value }>
										{ city.label }
									</option>
								) ) }
							</optgroup>
						) ) }
					</SelectControl>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<ServerSideRender block={ name } attributes={ attributes } />
			</div>
		</>
	);
}

export default {
	name,
	settings: {
		title: __( 'Ramadan', 'ramadan' ),
		description: __( 'Display ramadan calendar.', 'ramadan' ),
		category: 'ramadan',
		icon: 'megaphone',
		edit: Edit,
	},
};
