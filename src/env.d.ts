/// <reference path="../.astro/types.d.ts" />

declare namespace App {
	interface Locals {
		region?: import('./i18n/config').Region;
		embed?: boolean;
	}
}
