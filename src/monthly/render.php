<?php
/**
 * Render monthly prayer times table.
 *
 * @package Ramadan
 */

$calendar = new \AminulBD\Ramadan\Prayer_Calendar();
$city     = isset( $attributes['city'] ) ? $attributes['city'] : '';
$city     = empty( $city ) ? get_query_var( 'ramadan_city' ) : $city;
$calendar->set_district( $city );

$year  = isset( $attributes['year'] ) ? $attributes['year'] : '';
$year  = empty( $year ) ? current_datetime()->format( 'Y' ) : $year;
$month = isset( $attributes['month'] ) ? $attributes['month'] : get_query_var( 'ramadan_month' );
$month = empty( $month ) ? current_datetime()->format( 'F' ) : $month;

$monthFn   = strtolower( $month );
$schedules = $calendar->{$monthFn}();
?>

<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?>>
	<table class="prayer-times-table prayer-times-table-monthly">
		<thead>
		<tr>
			<?php foreach ( \AminulBD\Ramadan\Helper::get_headings() as $heading ) : ?>
				<th><?php echo esc_html( $heading ); ?></th>
			<?php endforeach; ?>
		</tr>
		</thead>
		<tbody>
		<?php foreach ( $schedules as $day => $schedule ) : ?>
			<tr>
				<td><?php echo date_i18n( 'd -- l', strtotime( "$year-$day" ) ); ?></td>
				<td><?php echo date_i18n( 'h:i A', strtotime( "$year-$day {$schedule['sahri']}" ) ); ?></td>
				<td><?php echo date_i18n( 'h:i A', strtotime( "$year-$day {$schedule['fajr']}" ) ); ?></td>
				<td><?php echo date_i18n( 'h:i A', strtotime( "$year-$day {$schedule['sunrise']}" ) ); ?></td>
				<td><?php echo date_i18n( 'h:i A', strtotime( "$year-$day {$schedule['dhuhr']}" ) ); ?></td>
				<td><?php echo date_i18n( 'h:i A', strtotime( "$year-$day {$schedule['asr']}" ) ); ?></td>
				<td><?php echo date_i18n( 'h:i A', strtotime( "$year-$day {$schedule['maghrib']}" ) ); ?></td>
				<td><?php echo date_i18n( 'h:i A', strtotime( "$year-$day {$schedule['isha']}" ) ); ?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>
</div>