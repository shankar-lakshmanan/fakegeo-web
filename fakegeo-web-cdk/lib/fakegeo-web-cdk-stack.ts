import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment';
import * as route53 from 'aws-cdk-lib/aws-route53';
import * as route53targets from 'aws-cdk-lib/aws-route53-targets';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as certificatemanager from 'aws-cdk-lib/aws-certificatemanager';

export class FakegeoWebCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

     // S3 Bucket for Website Hosting
     const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
      websiteIndexDocument: 'index.html',
      publicReadAccess: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ACLS, // Allows public access via website hosting, but not via ACLs
    });

    // Hosted Zone
    const hostedZone = route53.HostedZone.fromLookup(this, 'HostedZone', {
      domainName: 'fakegeo.com',
    });

    // SSL Certificate
    const certificate = new certificatemanager.Certificate(this, 'Certificate', {
      domainName: 'fakegeo.com',
      subjectAlternativeNames: ['www.fakegeo.com'], // Add the www domain
      validation: certificatemanager.CertificateValidation.fromDns(hostedZone),
    });

    // CloudFront Distribution
    // CloudFront Distribution
const distribution = new cloudfront.CloudFrontWebDistribution(this, 'WebsiteDistribution', {
  originConfigs: [
    {
      s3OriginSource: {
        s3BucketSource: websiteBucket,
      },
      behaviors: [
        {
          isDefaultBehavior: true,
          // Disable caching for index.html for dynamic routing
          defaultTtl: cdk.Duration.seconds(0),
          minTtl: cdk.Duration.seconds(0),
          maxTtl: cdk.Duration.seconds(0),
        },
      ],
    },
  ],
  viewerCertificate: cloudfront.ViewerCertificate.fromAcmCertificate(certificate, {
    aliases: ['fakegeo.com', 'www.fakegeo.com'],
  }),
  errorConfigurations: [
    {
      errorCode: 403, // Handle "Access Denied" for missing routes
      responseCode: 200,
      responsePagePath: '/index.html',
    },
    {
      errorCode: 404, // Handle "Not Found" for missing routes
      responseCode: 200,
      responsePagePath: '/index.html',
    },
  ],
});


    // Route53 Record
    new route53.ARecord(this, 'WebRecord', {
      zone: hostedZone,
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(distribution)
      ),
    });

     // Route53 Record for the www subdomain
  new route53.ARecord(this, 'WWWDomainRecord', {
    zone: hostedZone,
    recordName: 'www',
    target: route53.RecordTarget.fromAlias(
      new route53targets.CloudFrontTarget(distribution)
    ),
  });

    // Deploy Website Content
    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
      sources: [s3deploy.Source.asset('../build')], // Your Docusaurus build directory
      destinationBucket: websiteBucket,
    });

  }
}
