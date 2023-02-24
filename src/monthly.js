import ServerSideRender from '@wordpress/server-side-render';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { bangladesh as BDCities } from './utils/cities';

const name = 'ramadan/monthly';

function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	// Months
	const months = [];
	const localeMonths = window.ramadan.months;

	Object.keys( localeMonths ).forEach( ( month ) => {
		months.push( {
			label: localeMonths[ month ],
			value: month,
		} );
	} );

	// 20 years data.
	const years = Array.from( { length: 20 }, ( v, k ) => ( {
		label: k + 2020,
		value: k + 2020,
	} ) );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'ramadan' ) }>
					<SelectControl
						label={ __( 'Year', 'ramadan' ) }
						value={ attributes.year }
						options={ [
							{ label: __( 'Current', 'ramadan' ), value: '' },
							...years,
						] }
						onChange={ ( value ) =>
							setAttributes( { year: value } )
						}
					/>

					<SelectControl
						label={ __( 'Month', 'ramadan' ) }
						value={ attributes.month }
						options={ [
							{ label: __( 'Current', 'ramadan' ), value: '' },
							...months,
						] }
						onChange={ ( value ) =>
							setAttributes( { month: value } )
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
		title: __( 'Monthly', 'ramadan' ),
		description: __( 'Display monthly ramadan time.', 'ramadan' ),
		category: 'ramadan',
		icon: 'megaphone',
		edit: Edit,
	},
};
