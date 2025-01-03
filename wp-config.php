<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_pinupsecret' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '5u%kc&9 :CE$?&A5|m>M<L/iQ+~<_!5J@@]x[XupT402~H(:)olELVJ j),N,M+f' );
define( 'SECURE_AUTH_KEY',  '!TRZ|ayaabq:_u3i_gINDRln.Cee4~ZSGXgL]R@Ne^&wPIaf%|9NCB`jrpUj#I:T' );
define( 'LOGGED_IN_KEY',    'B36*I5=QuLz;[9X1F*#di]X7Fh(.S@&@)@7X4_$ k>f,Y)eNRYp)80CkW503=a%@' );
define( 'NONCE_KEY',        '%?}$BMIn(b@gA7+g6W%v{dLw]e110emWpE(f=ohy`h:%CT}HhabSO4#Fo)kIj7*_' );
define( 'AUTH_SALT',        'wgmRyRPDAQMH*t8v2@IbdHx%g#,6<#W#gR,6uxD6!vFt:et`/r-[rs13ny>/_182' );
define( 'SECURE_AUTH_SALT', 'aJGiw*X>2/yO/laNrG=JmLZP7+[i:p:?KF(#.i08]c=4Kq4?<Uo?RlXkN1hIY<+~' );
define( 'LOGGED_IN_SALT',   '5n7osj:^YE1-K~fi&y;.8H;*VcXa!#{h0j1^%A9>~2#-7@;r|;e[E&<5!y^pXY)k' );
define( 'NONCE_SALT',       'y1^)HOM/$Z&57U}`PiRDf_53U~%O-iwzlNLo(:$U(6SX)Z?$9o!ZJ9o]B*vU=_C<' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
